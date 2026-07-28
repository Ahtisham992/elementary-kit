import React from 'react';
import { Row, Column, Paragraph } from '@unlayer/react-elements';
import { Theme } from '../../theme/tokens';
import { ContentPayload } from '../../content/onboarding';

export function ReceiptItems({ theme, content }: { theme: Theme; content: ContentPayload }) {
  return (
    <>
      {content.lineItems.map((item, i) => (
        <Row key={i}>
          <Column>
            <Paragraph
              color={theme.colors.text}
              fontFamily={theme.fontFamily}
              fontSize="16px"
              lineHeight="1.5"
              padding="8px 20px"
            >
              <span style={{ fontWeight: i === content.lineItems.length - 1 ? 700 : 400 }}>{item.label}</span>
            </Paragraph>
          </Column>
          <Column>
            <Paragraph
              color={theme.colors.text}
              fontFamily={theme.fontFamily}
              fontSize="16px"
              lineHeight="1.5"
              padding="8px 20px"
              textAlign="right"
            >
              <span style={{ fontWeight: i === content.lineItems.length - 1 ? 700 : 400 }}>{item.value}</span>
            </Paragraph>
          </Column>
        </Row>
      ))}
    </>
  );
}
