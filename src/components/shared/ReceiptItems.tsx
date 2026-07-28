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
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: i === content.lineItems.length - 1 ? 'none' : '1px solid #e2e8f0', paddingBottom: '8px' }}>
                <span style={{ fontWeight: i === content.lineItems.length - 1 ? 700 : 400 }}>{item.label}</span>
                <span style={{ fontWeight: i === content.lineItems.length - 1 ? 700 : 400 }}>{item.value}</span>
              </div>
            </Paragraph>
          </Column>
        </Row>
      ))}
    </>
  );
}
