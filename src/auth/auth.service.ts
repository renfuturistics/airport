import {
  BadGatewayException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { Response, Request } from 'express';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new NotFoundException('email address not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new BadGatewayException('Invalid password please try again');
    }

    return user;
  }

  async login(user: any, res: Response) {
    try {
      const tokens = await this.getTokens(user._id, user.email);
      await this.updateRefreshToken(user._id, tokens.refreshToken);

      res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        maxAge: 168 * 60 * 60 * 1000,
      });
      res.cookie('userId', user._id.toString(), {
        httpOnly: true,
        maxAge: 168 * 60 * 60 * 1000,
      });
      res.cookie('token', tokens.token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });
      const token = tokens.token;
      const refreshToken = tokens.refreshToken;
      return { success: true, token, refreshToken };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async hashData(data: string) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(data, salt);
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.usersService.updateRefreshToken(userId, hashedRefreshToken);
  }
  async getTokens(userId: string, email: string) {
    const [token, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: '2h',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      token,
      refreshToken,
    };
  }
  async logout(req: any, res: Response) {
    const userId = req._id;

    res.clearCookie('refreshToken');
    res.clearCookie('userId');
    res.clearCookie('token');
    const result = await this.usersService.updateRefreshToken(userId, null);
    return result;
  }

  // Define error messages in one place for reusability

  async refreshTokens(req: Request, res: Response) {
    const refreshToken = req.cookies['refreshToken'];
    const userId = req.cookies['userId'];
    const ERROR_MESSAGES = {
      noUserIdOrRefreshToken:
        'Access Denied: No userId or refresh token in cookies',
      noUserFound: 'Access Denied: No user found',
      noRefreshToken: 'Access Denied: No refresh token',
      tokensDontMatch: 'Access Denied: Tokens do not match',
      invalidToken: 'Access Denied: Invalid Token',
      refreshTokenExpired: 'Access Denied: Refresh Token expired',
    };

    // Check for required data
    if (!userId || !refreshToken) {
      throw new ForbiddenException(ERROR_MESSAGES.noUserIdOrRefreshToken);
    }

    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new ForbiddenException(ERROR_MESSAGES.noUserFound);
    }

    if (!user.refreshToken) {
      throw new ForbiddenException(ERROR_MESSAGES.noRefreshToken);
    }

    // Verify the refresh token
    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );

    if (!refreshTokenMatches) {
      throw new ForbiddenException(ERROR_MESSAGES.tokensDontMatch);
    }

    const verifyRefreshToken = await this.jwtService.verify(refreshToken, {
      secret: process.env.JWT_REFRESH_SECRET!!,
    });

    if (!verifyRefreshToken) {
      throw new ForbiddenException(ERROR_MESSAGES.invalidToken);
    }

    // Check token expiration
    const currentTimestamp = Math.floor(Date.now() / 1000);

    if (verifyRefreshToken.exp < currentTimestamp) {
      throw new ForbiddenException(ERROR_MESSAGES.refreshTokenExpired);
    }

    // Generate new tokens and update cookies
    const tokens = await this.getTokens(user.id, user.email);

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      maxAge: 168 * 60 * 60 * 1000,
    });
    res.cookie('userId', user._id.toString(), {
      httpOnly: true,
      maxAge: 168 * 60 * 60 * 1000,
    });
    res.cookie('token', tokens.token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });

    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async register(body: any) {
    const result = this.usersService.create(body);
    if (!result) {
      throw new BadGatewayException('Error occurred');
    }
    return result;
  }
  async forgotPasswordToken(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('email address not found');
    }
    const token = await user.createPasswordResetToken();

    if (!token) {
      throw new BadGatewayException('unable to create token');
    }
    const result = await user.save();
    if (!result) {
      throw new BadGatewayException('unable to save token');
    }

    return user;
  }
  async resetPassword(token: string, password: string) {
    const user = await this.usersService.findUserByToken(token, password);
    return user;
  }
}
