import React from 'react';
import { Row, Column, Paragraph as BaseParagraph } from '@unlayer/react-elements';
const Paragraph = BaseParagraph as any;
import { Theme } from '../../theme/tokens';

export function Footer({ theme }: { theme: Theme }) {
  return (
    <Row padding="30px 0 20px 0">
      <Column>
        <Paragraph color="#888888" fontSize="12px" textAlign="center" lineHeight="1.6">
          &copy; {new Date().getFullYear()} Elementary Kit Inc. All rights reserved.<br />
          123 Design Avenue, Suite 400, San Francisco, CA 94107
        </Paragraph>
        <Paragraph color="#888888" fontSize="12px" textAlign="center" padding="10px 0 0 0">
          <a href="#" style={{ color: '#888888', textDecoration: 'underline' }}>Manage Preferences</a>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <a href="#" style={{ color: '#888888', textDecoration: 'underline' }}>Unsubscribe</a>
        </Paragraph>
      </Column>
    </Row>
  );
}
