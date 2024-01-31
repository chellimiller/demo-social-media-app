import * as React from 'react';
import styled from '@emotion/styled';
import clsx from 'clsx';
import { text } from './ui/emotion';
import {
  DialogKey,
  closeDialogAction,
  openCreditsDialog,
  toggleThemeModeAction,
  useDialogIsOpen,
  useThemeMode,
} from './state';
import { Button, Dialog, Header, Main } from './ui/components';
import { DarkModeIcon, InfoIcon, LightModeIcon } from './ui/icons';

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

function App(): React.ReactElement | null {
  const mode = useThemeMode();
  const creditsDialogOpen = useDialogIsOpen(DialogKey.CREDITS);

  React.useEffect(() => {
    document.body.className = clsx({
      'dark-mode': mode === 'dark',
      'light-mode': mode === 'light',
    });
  }, [mode]);

  return (
    <AppRoot>
      <Header>
        <Header.Title to="/">Prototype React App</Header.Title>
        <Header.Actions>
          <Button
            iconOnly
            label="Toggle Light and Dark Mode"
            onClick={toggleThemeModeAction}
            icon={mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
          />
          <Button
            iconOnly
            label="View Credits"
            onClick={openCreditsDialog}
            icon={<InfoIcon />}
          />
        </Header.Actions>
      </Header>
      <Main>
        Lorem ipsum dolor sit amet, consectetur adipiscing yada yada...
      </Main>
      <Dialog open={creditsDialogOpen} onClose={closeDialogAction}>
        <Dialog.Title>Credits</Dialog.Title>
        <Dialog.Content>
          <p>
            This React app prototype template was created by{' '}
            <a href="https://github.com/chellimiller">Michelle Miller</a> and{' '}
            <a href="https://github.com/JaredBourget">Jared Bourget</a>.
          </p>
          <p>
            Beyond React, we used the following libraries:
            <ul>
              <li>
                <a href="https://emotion.sh/">Emotion</a> for styling
                components.
              </li>
              <li>
                <a href="https://floating-ui.com/">Floating UI</a> for dialogs
                and other poppers.
              </li>
              <li>
                <a href="https://feathericons.com/">Feather Icons</a> for icons.
              </li>
              <li>
                <a href="https://redux-toolkit.js.org/">Redux Toolkit</a> for
                managing page state and tree state.
              </li>
              <li>
                <a href="https://www.npmjs.com/package/clsx">clsx</a> for
                constructing class names.
              </li>
            </ul>
          </p>
          <p>
            The following libraries are also included:
            <ul>
              <li>
                <a href="https://github.com/sindresorhus/type-fest">
                  Type Fest
                </a>{' '}
                for utility types.
              </li>
              <li>
                <a href="https://reactrouter.com/en/main">React Router</a> for
                routing and navigation.
              </li>
              <li>
                <a href="https://usehooks-ts.com/">usehooks-ts</a> for common
                utility hooks.
              </li>
              <li>
                <a href="https://moment.github.io/luxon/">Luxon</a> for date and
                time manipulation.
              </li>
              <li>
                <a href="https://lodash.com/">lodash</a> for generic utilities.
              </li>
              <li>
                <a href="https://dexie.org/">Dexie</a> for persisted data tables
                that can be queried.
              </li>
            </ul>
          </p>
          <p>
            To learn more,{' '}
            <a href="https://github.com/utori-dev/template-react-app-prototype">
              view the project on GitHub!
            </a>
          </p>
        </Dialog.Content>
      </Dialog>
    </AppRoot>
  );
}

export default App;
