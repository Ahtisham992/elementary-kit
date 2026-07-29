import React from 'react';
import { Row, Column, Paragraph as BaseParagraph, Divider as BaseDivider } from '@unlayer/react-elements';
const Paragraph = BaseParagraph as any;
const Divider = BaseDivider as any;
import { Theme } from '../../theme/tokens';
import { ContentPayload } from '../../content/onboarding';

export function ReceiptItems({ theme, content }: { theme: Theme; content: ContentPayload }) {
  const details = content.receiptDetails;
  const formatMoney = (amount: number) => `$${amount.toFixed(2)}`;

  if (!details) {
    // Fallback to legacy string lineItems
    return (
      <>
        <Row><Column><Divider lineColor="#cbd5e1" lineStyle="solid" lineWidth="1px" padding="10px 20px" width="100%" /></Column></Row>
        {content.lineItems.map((item, i) => {
          const isLast = i === content.lineItems.length - 1;
          return (
            <Row key={i}>
              <Column>
                <Paragraph color={theme.colors.text} fontFamily={theme.fontFamily} fontSize={isLast ? "16px" : "14px"} lineHeight="1.8" padding="0px 20px" fontWeight={isLast ? 700 : 400}>{item.label}</Paragraph>
              </Column>
              <Column>
                <Paragraph color={theme.colors.text} fontFamily={theme.fontFamily} fontSize={isLast ? "16px" : "14px"} lineHeight="1.8" padding="0px 20px" textAlign="right" fontWeight={isLast ? 700 : 400}>{item.value}</Paragraph>
              </Column>
            </Row>
          );
        })}
        <Row><Column><Divider lineColor="#cbd5e1" lineStyle="solid" lineWidth="1px" padding="10px 20px" width="100%" /></Column></Row>
      </>
    );
  }

  const subtotal = details.items.reduce((acc, item) => acc + item.price, 0);
  const totalExtra = details.extraCharges.reduce((acc, charge) => acc + charge.amount, 0);
  const taxAmount = (subtotal + totalExtra) * ((details.taxRate || 0) / 100);
  const total = subtotal + totalExtra + taxAmount;

  return (
    <>
      <Row><Column><Divider lineColor="#cbd5e1" lineStyle="solid" lineWidth="1px" padding="10px 20px" width="100%" /></Column></Row>

      {/* Items */}
      {details.items.map((item, i) => (
        <Row key={`item-${i}`}>
          <Column>
            <Paragraph color={theme.colors.text} fontFamily={theme.fontFamily} fontSize="14px" lineHeight="1.8" padding="0px 20px" fontWeight={400}>{item.description}</Paragraph>
          </Column>
          <Column>
            <Paragraph color={theme.colors.text} fontFamily={theme.fontFamily} fontSize="14px" lineHeight="1.8" padding="0px 20px" textAlign="right" fontWeight={400}>{formatMoney(item.price)}</Paragraph>
          </Column>
        </Row>
      ))}

      {/* Extra Charges */}
      {details.extraCharges.map((charge, i) => (
        <Row key={`extra-${i}`}>
          <Column>
            <Paragraph color={theme.colors.text} fontFamily={theme.fontFamily} fontSize="14px" lineHeight="1.8" padding="0px 20px" fontWeight={400}>{charge.label}</Paragraph>
          </Column>
          <Column>
            <Paragraph color={theme.colors.text} fontFamily={theme.fontFamily} fontSize="14px" lineHeight="1.8" padding="0px 20px" textAlign="right" fontWeight={400}>{formatMoney(charge.amount)}</Paragraph>
          </Column>
        </Row>
      ))}

      {/* Tax */}
      {details.taxRate !== undefined && (
        <Row>
          <Column>
            <Paragraph color={theme.colors.text} fontFamily={theme.fontFamily} fontSize="14px" lineHeight="1.8" padding="0px 20px" fontWeight={400}>Tax ({details.taxRate}%)</Paragraph>
          </Column>
          <Column>
            <Paragraph color={theme.colors.text} fontFamily={theme.fontFamily} fontSize="14px" lineHeight="1.8" padding="0px 20px" textAlign="right" fontWeight={400}>{formatMoney(taxAmount)}</Paragraph>
          </Column>
        </Row>
      )}

      {/* Total */}
      <Row>
        <Column>
          <Paragraph color={theme.colors.text} fontFamily={theme.fontFamily} fontSize="16px" lineHeight="1.8" padding="0px 20px" fontWeight={700}>Total</Paragraph>
        </Column>
        <Column>
          <Paragraph color={theme.colors.text} fontFamily={theme.fontFamily} fontSize="16px" lineHeight="1.8" padding="0px 20px" textAlign="right" fontWeight={700}>{formatMoney(total)}</Paragraph>
        </Column>
      </Row>

      <Row><Column><Divider lineColor="#cbd5e1" lineStyle="solid" lineWidth="1px" padding="10px 20px" width="100%" /></Column></Row>
    </>
  );
}
