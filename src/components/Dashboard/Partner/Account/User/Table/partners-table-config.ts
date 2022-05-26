import NameCell from 'src/components/UserTable/Cells/NameCell';
import JointCell from 'src/components/UserTable/Cells/JointCell';
import LastLoginCell from 'src/components/UserTable/Cells/LastLoginCell';
import StatusCell from 'src/components/UserTable/Cells/StatusCell';
import DefaultCell from 'src/components/UserTable/Cells/DefaultCell';
// import TeamCell from 'src/components/UserTable/Cells/TeamCell';
// import RoleCell from 'src/components/UserTable/Cells/RoleCell';
// import OverviewCell from 'src/components/UserTable/Cells/OverviewCell';
// import validators from 'validator';
// import messages from '../messages';
import Input from 'src/components/UserTable/Inputs/Input';
import Avatar from 'src/components/UserTable/Inputs/Avatar';
import NameInput from 'src/components/UserTable/Inputs/NameInput';
import PasswordInput from 'src/components/UserTable/Inputs/PasswordInput';
import TeamSelect from 'src/components/UserTable/Inputs/TeamSelect';
import RoleSelect from 'src/components/UserTable/Inputs/RoleSelect';
// import NationalityCell from 'src/components/UserTable/Cells/NationalityCell';

export default Object.freeze({
  headers: {
    id: {
      index: 0,
      name: 'ID',
      prop: 'uniqueId',
      sticky: true,
      style: {
        minWidth: 120,
      },
      component: DefaultCell,
      componentName: 'DefaultCell',
      componentProps: {},
    },
    // team: {
    //   index: 1,
    //   name: 'IP (LAST LOGIN)',
    //   sticky: true,
    //   style: {
    //     minWidth: 120,
    //   },
    //   component: NationalityCell,
    //   componentName: 'NationalityCell',
    //   componentProps: {},
    // },
    team: {
      index: 1,
      name: 'IP (LAST LOGIN)',
      sticky: true,
      style: {
        minWidth: 120,
      },
      component: DefaultCell,
      componentName: 'DefaultCell',
      componentProps: {},
    },
    name: {
      index: 2,
      name: 'NAME',
      sticky: true,
      style: {
        minWidth: 220,
      },
      component: NameCell,
      componentName: 'NameCell',
      componentProps: {},
    },
    email: {
      index: 3,
      name: 'EMAIL',
      sticky: true,
      style: {
        minWidth: 272,
      },
      prop: 'email',
      direction: 'right',
      component: DefaultCell,
      componentName: 'DefaultCell',
      componentProps: {},
    },
    joint: {
      index: 4,
      name: 'JOINT',
      style: {
        minWidth: 174,
      },
      component: JointCell,
      componentName: 'JointCell',
      componentProps: {},
    },
    hours: {
      index: 5,
      name: 'HOURS',
      style: {
        minWidth: 160,
      },
      component: DefaultCell,
      componentName: 'DefaultCell',
      componentProps: {},
    },
    upload: {
      index: 6,
      name: 'UPLOAD',
      style: {
        minWidth: 160,
      },
      component: DefaultCell,
      componentName: 'DefaultCell',
      componentProps: {},
    },
    activity: {
      index: 7,
      name: 'ACTIVITY',
      style: {
        minWidth: 160,
      },
      component: DefaultCell,
      componentName: 'DefaultCell',
      componentProps: {},
    },
    lastLogin: {
      index: 8,
      name: 'LAST LOGIN',
      style: {
        minWidth: 160,
      },
      component: LastLoginCell,
      componentName: 'LastLoginCell',
      componentProps: {},
    },
    status: {
      index: 9,
      name: 'STATUS',
      style: {
        minWidth: 140,
      },
      component: StatusCell,
      componentName: 'StatusCell',
      componentProps: {
        activeName: 'activate',
        unActiveName: 'deactivate',
      },
    },
  },
  team: {
    name: 'READER',
    users: [
      {
        _id: 1,
        uniqueId: '000-000-001',
        location: '615afc94899dd8828faebd8a',
        avatar:
          'https://upload.jidipi.com/avatars/users/default/avatar-m-05%402x.png',
        firstName: 'test',
        lastName: 'test',
        email: 'test@test.com',
        createdAt: '2022-03-21T11:34:35.567Z',
        lastLoginAt: '2022-03-21T11:34:35.567Z',
        hours: '23h 20m 40s',
        visited: '3,829',
        saved: '123',
        isActive: true,
        roles: ['62283bd96183fd25bbd5cc27'],
      },
      {
        _id: 2,
        uniqueId: '000-000-002',
        location: '615afc94899dd8828faebd8a',
        avatar:
          'https://upload.jidipi.com/avatars/users/default/avatar-m-05%402x.png',
        firstName: 'test1',
        lastName: 'test1',
        email: 'test1@test1.com',
        createdAt: '2022-03-21T11:34:35.567Z',
        lastLoginAt: '2022-03-21T11:34:35.567Z',
        hours: '23h 20m 40s',
        visited: '3,829',
        saved: '321',
        isActive: true,
        roles: ['62283bd96183fd25bbd5cc27'],
      },
    ],
  },
  inputs: {
    right: {
      id: {
        index: 0,
        component: Input,
        componentName: 'Input',
        componentProps: {
          prop: 'uniqueId',
          disabled: true,
          custom: true,
          placeholder: 'ID',
        },
      },
      team: {
        index: 1,
        name: 'TEAM',
        component: TeamSelect,
        componentName: 'TeamSelect',
        type: 'select',
        componentProps: {
          prop: 'teamName',
        },
      },
      roles: {
        index: 2,
        name: 'ROLES',
        component: RoleSelect,
        componentName: 'RoleSelect',
        type: 'select',
        componentProps: {
          prop: 'roles',
          isDisabled: true,
        },
      },
    },
    middle: {
      avatar: {
        index: 3,
        name: 'Avatar',
        component: Avatar,
        componentName: 'Avatar',
        componentProps: {},
      },
    },
    left: {
      name: {
        index: 4,
        name: 'NAME',
        component: NameInput,
        componentName: 'NameInput',
        componentProps: {},
      },
      email: {
        index: 5,
        name: 'EMAIL',
        component: Input,
        componentName: 'Input',
        componentProps: {
          prop: 'email',
          placeholder: 'EMAIL',
          custom: true,
        },
      },
      password: {
        index: 6,
        name: 'PASSWORD',
        component: PasswordInput,
        componentName: 'PasswordInput',
        componentProps: {
          prop: 'password',
          custom: true,
        },
      },
    },
  },
  unEditable: false,
  noContextMenu: false,
  isStaff: true,
  initialRow(team: any) {
    return {
      _id: 'initial_user',
      uniqueId: '',
      location: '',
      firstName: '',
      lastName: '',
      email: '',
      registrationDate: '',
      avatar: '',
      logoId: '',
      roleId: '',
      isActive: false,
      teamId: team._id
    }
  },
  // validations: {
  //   firstName: {
  //     validate: value => validators.isLength(value, { min: 4, max: 50 }),
  //     error: `${messages.enterValid} First Name`,
  //   },
  //   lastName: {
  //     validate: value => validators.isLength(value, { min: 4, max: 50 }),
  //     error: `${messages.enterValid} Last Name`,
  //   },
  //   email: {
  //     validate: value => validators.isEmail(value),
  //     error: `${messages.enterValid} Email`,
  //   },
  //   password: {
  //     validate: value => validators.isLength(value, { min: 8, max: 20 }),
  //     error: `${messages.enterValid} Password`,
  //   },
  // },
  firstInitItemState(team: any) {
    const item = {
      password: '',
      firstName: '',
      lastName: '',
      email: '',
      avatar: '',
      logoId: '',
      team: '',
      teamName: team.name,
      roles: [],
    }
    return item;
  },
  selectExistingUser(role: any, user: any, teamId: any) {
    user.roles.push(role)
    return {
      ...user,
      teamId,
      isExistingUser: true,
      roles: user.roles
    }
  },
  resetOnSelectItem(selectedItem: any, team: any) {
    return {
      uniqueId: selectedItem.uniqueId,
      firstName: selectedItem.firstName,
      lastName: selectedItem.lastName,
      avatar: selectedItem.avatar,
      email: selectedItem.email,
      logoId: selectedItem.logoId,
      teamName: team.name,
      _id: selectedItem._id,
      userId: selectedItem._id,
      username: selectedItem.email,
      teamId: team._id,
      roles: selectedItem.roles,
      isExistingUser: selectedItem.isExistingUser
    };
  },
  onAddMemberItemRemap(item: any, team: any) {
    const updatedItem = {
      ...item,
      // roles: [itemRole],
      teamId: item.teamId || team._id,
      username: item.email,
    };
    if (updatedItem._id === 'new_user') {
      delete updatedItem._id;
      delete updatedItem.userId;
    }
    return updatedItem;
  },
  onConfirmDeleteMemberItemRemap(item: any, team: any) {
    return {
      _id: item._id,
      userId: item._id,
      // roles: item.roles,
      teamName: item.teamName,
      username: item.email,
      isDeleted: true,
      logoId: item.logoId,
      avatar: item.avatar,
      firstName: item.firstName,
      lastName: item.lastName,
      teamId: team._id,
    };
  },
  validationErrors: {
    firstName: {
      isValid: false,
    },
    lastName: {
      isValid: false,
    },
    email: {
      isValid: false,
    },
    password: {
      isValid: false,
    },
  },
});
