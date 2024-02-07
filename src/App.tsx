import * as React from 'react';
import styled from '@emotion/styled';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import clsx from 'clsx';
import { text, button } from './ui/emotion';
import {
  toggleThemeModeAction,
  useCurrentUsername,
  useThemeMode,
} from './state';
import { Button, Header, Main } from './ui/components';
import { DarkModeIcon, GithubIcon, LightModeIcon, UserIcon } from './ui/icons';
import { FeedView, ProfileView } from './views';

const AppRoot = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  overflow: hidden;
  display: flex;
  flex-flow: column nowrap;

  background: var(--color--background);
  color: var(--color--on-background);

  ${text.md}
`;

const NavLink = styled.a`
  ${button.base};
  ${button.variant.ghost};
`.withComponent(Link);

function App(): React.ReactElement | null {
  const mode = useThemeMode();
  const username = useCurrentUsername();

  React.useEffect(() => {
    document.body.className = clsx({
      'dark-mode': mode === 'dark',
      'light-mode': mode === 'light',
    });
  }, [mode]);

  return (
    <AppRoot>
      <Header>
        <Header.Title to="/">Mock Social</Header.Title>
        <Header.Actions>
          <Button
            iconOnly
            label="Toggle Light and Dark Mode"
            onClick={toggleThemeModeAction}
            icon={mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
          />
          <NavLink
            to="https://github.com/chellimiller/demo-social-media-app"
            aria-label="GitHub"
          >
            <GithubIcon />
          </NavLink>
          <NavLink to="/profile" aria-label="View Profile">
            <UserIcon />
          </NavLink>
        </Header.Actions>
      </Header>
      <Main>
        <Routes>
          <Route path="/" element={<Navigate to="feed" />} />
          <Route path="/feed">
            <Route index element={<FeedView />} />
          </Route>
          <Route path="/profile">
            <Route index element={<Navigate to={username ?? ''} />} />
            <Route path=":username" element={<ProfileView />} />
          </Route>
        </Routes>
      </Main>
    </AppRoot>
  );
}

export default App;
