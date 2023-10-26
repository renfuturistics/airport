import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IRole } from './role';
import { Permissions } from './permissions';
@Injectable()
export class RoleService implements OnModuleInit {
  constructor(@InjectModel('Role') private readonly role: Model<IRole>) {}
  async onModuleInit() {
    await this.initializeRoles();
  }
  async initializeRoles() {
    try {
      const rolesWithPermissions = [
        {
          name: 'User',
          permissions: [
            Permissions.ViewUserProfile,
            Permissions.EditUserProfile,
            Permissions.ViewPublicContent,
          ],
        },
        {
          name: 'Admin',
          permissions: [
            Permissions.ManageUsers,
            Permissions.ManageContent,
            Permissions.ConfigureSettings,
          ],
        },
        {
          name: 'Superadmin',
          permissions: [
            Permissions.ManageAdmins,
            Permissions.ManageRoles,
            Permissions.AccessAdvancedSettings,
          ],
        },

        // Define other roles with their permissions here
      ];

      for (const roleData of rolesWithPermissions) {
        const existingRole = await this.role.findOne({ name: roleData.name });

        if (!existingRole) {
          const role = new this.role(roleData);
          await role.save();
        }
      }

      return 'Roles initialized successfully.';
    } catch (error) {
      throw new Error(`Error initializing roles: ${error.message}`);
    }
  }
}
