'use strict';

const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'password', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('Users', 'role', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'member',
    });

    const users = await queryInterface.sequelize.query(
      'SELECT id FROM "Users" ORDER BY id ASC',
      { type: Sequelize.QueryTypes.SELECT }
    );

    for (const user of users) {
      const hash = await bcrypt.hash('ChangeMe123!', 10);

      await queryInterface.bulkUpdate(
        'Users',
        { password: hash },
        { id: user.id }
      );
    }

    await queryInterface.changeColumn('Users', 'password', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.changeColumn('Users', 'email', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addConstraint('Users', {
      fields: ['email'],
      type: 'unique',
      name: 'users_email_unique',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'Users',
      'users_email_unique'
    );

    await queryInterface.changeColumn('Users', 'email', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.removeColumn('Users', 'password');
    await queryInterface.removeColumn('Users', 'role');
  },
};
