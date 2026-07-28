import React from 'react';
import { Row, Column, Paragraph as BaseParagraph } from '@unlayer/react-elements';
const Paragraph = BaseParagraph as any;
import { Theme } from '../../theme/tokens';
import { ContentPayload } from '../../content/onboarding';

export function ReceiptItems({ theme, content }: { theme: Theme; content: ContentPayload }) {
  return (
    <>
      {/* Separator line */}
      <Row>
        <Column>
          <Paragraph
            color={theme.colors.text}
            fontFamily={theme.fontFamily}
            fontSize="12px"
            lineHeight="0.5"
            padding="4px 20px"
          >
            ————————————————————
          </Paragraph>
        </Column>
      </Row>

      {content.lineItems.map((item, i) => {
        const isLast = i === content.lineItems.length - 1;
        // Format as "Label ............ $Value" using dots as filler
        const label = item.label;
        const value = item.value;
        return (
          <Row key={i}>
            <Column>
              <Paragraph
                color={theme.colors.text}
                fontFamily={theme.fontFamily}
                fontSize={isLast ? "16px" : "14px"}
                lineHeight="1.8"
                padding="0px 20px"
                fontWeight={isLast ? 700 : 400}
              >
                {label}
              </Paragraph>
            </Column>
            <Column>
              <Paragraph
                color={theme.colors.text}
                fontFamily={theme.fontFamily}
                fontSize={isLast ? "16px" : "14px"}
                lineHeight="1.8"
                padding="0px 20px"
                textAlign="right"
                fontWeight={isLast ? 700 : 400}
              >
                {value}
              </Paragraph>
            </Column>
          </Row>
        );
      })}

      {/* Bottom separator */}
      <Row>
        <Column>
          <Paragraph
            color={theme.colors.text}
            fontFamily={theme.fontFamily}
            fontSize="12px"
            lineHeight="0.5"
            padding="4px 20px"
          >
            ————————————————————
          </Paragraph>
        </Column>
      </Row>
    </>
  );
}
