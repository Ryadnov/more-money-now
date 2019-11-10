import React from 'react'
import styled from 'styled-components'
import TagSelect from 'components/TagSelect'
import { format } from 'date-fns'
import ru from 'date-fns/locale/ru'
import { FormattedNumber } from 'react-intl'
import Reciept from './Reciept'
import { Button, Box } from '@material-ui/core'

const formatDate = date => format(date, 'd MMMM yyyy, EEEEEE', { locale: ru })
const formatDateTime = date =>
  format(date, 'd MMMM yyyy, EEEEEE, HH:mm:ss', { locale: ru })

const Panel = styled.section`
  display: flex;
  flex-direction: column;
  padding: 40px;
  overflow: auto;
`

const Line = ({ name, value }) => {
  const Body = styled.div`
    display: flex;
    flex-direction: row;
    padding: 8px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  `
  const Name = styled.div`
    flex-shrink: 0;
    width: 200px;
  `
  const Value = styled.div`
    flex-grow: 1;
    margin-left: 8px;
  `
  return (
    <Body>
      <Name>{name}</Name>
      <Value>{value}</Value>
    </Body>
  )
}

export default class DetailsPanel extends React.Component {
  state = {
    transaction: null,
    changed: null,
  }

  componentWillReceiveProps = ({ transaction }) => {
    if (transaction) {
      this.setState({
        transaction: {
          ...transaction,
          ...{ tag: transaction.tag && transaction.tag.map(tag => tag.id) },
        },
      })
    }
  }

  saveChanges = () => this.props.onSave(this.state.transaction)

  updateTags = tags => {
    this.setState(prev => {
      return {
        transaction: { ...prev.transaction, ...{ tag: tags } },
        changed: { ...prev.changed, ...{ tag: tags } },
      }
    })
  }

  render() {
    const tr = this.state.transaction

    const values = tr
      ? [
<<<<<<< HEAD
        {
          name: 'ID',
          value: tr.id,
        },
        {
          name: 'Дата',
          value: formatDate(tr.date),
        },
        {
          name: 'Создана',
          value: formatDateTime(tr.created),
        },
        {
          name: 'Последнее изменение',
          value: formatDateTime(tr.changed),
        },
        {
          name: 'Доход',
          value: (
            <FormattedNumber
              value={tr.income}
              style={`currency`}
              currency={tr.incomeInstrument.shortTitle}
              minimumFractionDigits={0}
              maximumFractionDigits={0}
            />
          ),
        },
        {
          name: 'На счёт',
          value: tr.incomeAccount.title,
        },
        {
          name: 'Расход',
          value: (
            <FormattedNumber
              value={tr.outcome}
              style={`currency`}
              currency={tr.outcomeInstrument.shortTitle}
              minimumFractionDigits={0}
              maximumFractionDigits={0}
            />
          ),
        },
        {
          name: 'Со счёта',
          value: tr.outcomeAccount.title,
        },
        {
          name: 'originalPayee',
          value: tr.originalPayee,
        },
        {
          name: 'Категории',
          value: tr.tag ? tr.tag.map(tag => tag.title).join(', ') : '--',
        },
        {
          name: 'payee',
          value: tr.payee,
        },
        {
          name: 'deleted',
          value: tr.deleted,
        },
        {
          name: 'hold',
          value: tr.hold,
        },
        {
          name: tr.qrCode ? (
            <Popover content={<QRCode value={tr.qrCode}/>} placement="topLeft">
              <Badge status={'light'}>qrCode</Badge>
            </Popover>
          ) : 'qrCode',
          value: tr.qrCode,
        },
        {
          name: 'comment',
          value: tr.comment,
        },
        {
          name: 'opIncome',
          value: tr.opIncome,
        },
        {
          name: 'opOutcome',
          value: tr.opOutcome,
        },
        // {
        //   name: 'opIncomeInstrument',
        //   value: tr.opIncomeInstrument
        // },
        // {
        //   name: 'opOutcomeInstrument',
        //   value: tr.opOutcomeInstrument
        // },
        {
          name: 'GEO',
          value: (
            <a
              href={`https://www.google.com/maps/@${tr.latitude},${
                tr.longitude
              },18z`}
            >
              {tr.latitude + ' ' + tr.longitude}
            </a>
          ),
        },
        {
          name: 'merchant',
          value: tr.merchant ? tr.merchant.title : 'null',
        },
        {
          name: 'incomeBankID',
          value: tr.incomeBankID,
        },
        {
          name: 'outcomeBankID',
          value: tr.outcomeBankID,
        },
      ]
=======
          {
            name: 'Дата',
            value: formatDate(tr.date),
          },
          {
            name: 'Создана',
            value: formatDateTime(tr.created),
          },
          {
            name: 'Последнее изменение',
            value: formatDateTime(tr.changed),
          },
          {
            name: 'Доход',
            value: (
              <FormattedNumber
                value={tr.income}
                style={`currency`}
                currency={tr.incomeInstrument.shortTitle}
                minimumFractionDigits={0}
                maximumFractionDigits={0}
              />
            ),
          },
          {
            name: 'На счёт',
            value: tr.incomeAccount.title,
          },
          {
            name: 'Расход',
            value: (
              <FormattedNumber
                value={tr.outcome}
                style={`currency`}
                currency={tr.outcomeInstrument.shortTitle}
                minimumFractionDigits={0}
                maximumFractionDigits={0}
              />
            ),
          },
          {
            name: 'Со счёта',
            value: tr.outcomeAccount.title,
          },
          {
            name: 'originalPayee',
            value: tr.originalPayee,
          },

          {
            name: 'Чек',
            value: <Reciept value={tr.qrCode} />,
          },
          {
            name: 'Плательщик',
            value: tr.payee,
          },
          {
            name: 'Deleted',
            value: tr.deleted ? 'удалена' : 'не удалена',
          },
          {
            name: 'hold',
            value: tr.hold,
          },
          {
            name: 'Комментарий',
            value: tr.comment,
          },
          {
            name: 'opIncome',
            value: tr.opIncome,
          },
          {
            name: 'opOutcome',
            value: tr.opOutcome,
          },
          {
            name: 'ID',
            value: tr.id,
          },
          // {
          //   name: 'opIncomeInstrument',
          //   value: tr.opIncomeInstrument
          // },
          // {
          //   name: 'opOutcomeInstrument',
          //   value: tr.opOutcomeInstrument
          // },
          {
            name: 'GEO',
            value: (
              <a
                href={`https://www.google.com/maps/@${tr.latitude},${tr.longitude},18z`}
              >
                {tr.latitude + ' ' + tr.longitude}
              </a>
            ),
          },
          {
            name: 'merchant',
            value: tr.merchant ? tr.merchant.title : 'null',
          },
          {
            name: 'incomeBankID',
            value: tr.incomeBankID,
          },
          {
            name: 'outcomeBankID',
            value: tr.outcomeBankID,
          },
        ]
>>>>>>> origin/material-ui
      : null

    const tags = tr && tr.tag

    return (
      <Panel>
        {tr && (
          <div key={tr.id}>
            <TagSelect value={tags} onChange={this.updateTags}/>
            <div/>
            {tr.deleted ? (
              <Button
                onClick={() => {
                  this.props.onRestore(tr.id)
                }}
              >
                Восстановить
              </Button>
            ) : (
              <Box color="error.main" display="inline">
                <Button
                  color="inherit"
                  onClick={() => this.props.onDelete(tr.id)}
                >
                  Удалить
                </Button>
              </Box>
            )}

            {tr.type === 'transfer' && (
              <Button onClick={() => this.props.onSplit(tr.id)}>
                Разбить перевод
              </Button>
            )}
            <Button onClick={() => console.log(tr)}>Log</Button>
            <Button onClick={this.saveChanges}>Сохранить</Button>

            {values.map(el => (
              <Line name={el.name} value={el.value} key={el.name}/>
            ))}

            {tr.latitude && (
              <div>
                <iframe
                  title="geo"
                  src={`https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d1040.2885062361672!2d${tr.longitude}!3d${tr.latitude}!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2sru!4v1546784599411`}
                  width="380"
                  height="450"
                  frameBorder="0"
                  style={{ border: 0 }}
                  allowFullScreen
                />
              </div>
            )}
          </div>
        )}
      </Panel>
    )
  }
}
