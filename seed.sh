#!/bin/bash
sequelize db:seed --seeders-path ./backend/seeders --config ./backend/config/config.json --seed ./backend/seeders/20170214155739-user-seeder
node ./backend/seeders/document-seeder
sequelize db:seed --seeders-path ./backend/seeders --config ./backend/config/config.json --seed ./backend/seeders/20170214231329-comment-seeder
