'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    const existing = await queryInterface.sequelize.query(
      'SELECT id FROM "Users" WHERE email = \'admin@example.com\'',
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (existing.length > 0) {
      return;
    }

    const password = await bcrypt.hash('AdminPass123!', 10);
    const now = new Date();

    await queryInterface.bulkInsert('Users', [
      {
        name: 'GT9 Admin',
        email: 'admin@example.com',
        password,
        role: 'admin',
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', {
      email: 'admin@example.com',
    });
  },
};