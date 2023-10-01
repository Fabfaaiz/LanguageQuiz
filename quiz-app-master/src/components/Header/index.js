import React, { useState } from 'react';
import { Menu, Button } from 'semantic-ui-react';

const Header = () => {

  return (
    <Menu stackable inverted size="massive">
      <Menu.Item header>
        <h1 style={{ color: '#2185D0' }}>QuizApp</h1>
      </Menu.Item>
        <Menu.Item position="right">
          <Button
            href='/quiz-app/leaderboard'
            color="teal"
            icon="external alternate"
            labelPosition="left"
            content="Leaderboard"
          />
        </Menu.Item>
    </Menu>
  );
};

export default Header;
