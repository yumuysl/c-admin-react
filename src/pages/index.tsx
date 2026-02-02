import { Card, Col, Row } from 'antd'
import { useTranslation } from 'react-i18next'

import { BarChart, LineChart, RingChart } from '@/components/chart'

import CardList from './components/CardList'

export default function Dashboard() {
  const { t } = useTranslation()

  return (
    <div className="m-2 flex flex-col gap-2">
      <Card variant="borderless" styles={{ body: { padding: '16px' } }}>
        <CardList />
      </Card>

      <Row gutter={[8, 8]}>
        <Col xs={24} sm={24} md={14}>
          <Card
            title={t('page.home.sales')}
            variant="borderless"
            styles={{ body: { padding: '16px' } }}
          >
            <BarChart
              data={[
                { name: t('page.home.lastYear'), data: [125, 186, 154, 210, 243, 278, 210, 232] },
                { name: t('page.home.thisYear'), data: [220, 182, 191, 234, 290, 330, 310, 322] },
              ]}
              xAxisData={[
                t('page.home.January'),
                t('page.home.February'),
                t('page.home.March'),
                t('page.home.April'),
                t('page.home.May'),
                t('page.home.June'),
                t('page.home.July'),
                t('page.home.August'),
              ]}
              showLegend
              legendData={[t('page.home.lastYear'), t('page.home.thisYear')]}
              barWidth="20%"
            />
          </Card>
        </Col>

        <Col xs={24} sm={24} md={10}>
          <Card
            title={t('page.home.salesDistribution')}
            variant="borderless"
            styles={{ body: { padding: '16px' } }}
          >
            <RingChart
              data={[
                { value: 42, name: t('page.home.domesticMarket') },
                { value: 28, name: t('page.home.asiaPacificMarket') },
                { value: 30, name: t('page.home.europeanMarket') },
              ]}
              color={['#4C87F3', '#93F1B4', '#8BD8FC']}
              radius={['0%', '80%']}
            />
          </Card>
        </Col>

        <Col span={24}>
          <Card
            title={t('page.home.customerSatisfaction')}
            variant="borderless"
            styles={{ body: { padding: '16px' } }}
          >
            <LineChart
              data={[
                {
                  name: t('page.home.lastMonth'),
                  data: [65, 72, 58, 74, 52, 85, 78, 83, 92, 84, 89, 95],
                },
                {
                  name: t('page.home.thisMonth'),
                  data: [78, 75, 82, 86, 90, 94, 88, 91, 96, 93, 97, 99],
                },
              ]}
              xAxisData={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']}
              showAreaColor
              showLegend
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}
