import { Card, Col, Row } from 'antd'
import { useTranslation } from 'react-i18next'

import { BarChart, KLineChart, LineChart, RadarChart, RingChart, ScatterChart } from '@/components/chart'
import { BaseContainer } from '@/components/container'

export default function ChartExample() {
  const { t } = useTranslation()

  return (
    <BaseContainer title={t('page.chartExample.title')}>
      <Row gutter={[20, 20]}>
        <Col xs={24} lg={12}>
          <Card title={t('page.chartExample.barChart')}>
            <BarChart
              data={[125, 186, 154, 210, 243, 278]}
              xAxisData={['2018', '2019', '2020', '2021', '2022', '2023']}
            />
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title={t('page.chartExample.lineChart')}>
            <LineChart
              data={[65, 87, 92, 108, 136, 152]}
              xAxisData={['2023 Q1', 'Q2', 'Q3', 'Q4', '2024 Q1', 'Q2']}
              showAreaColor
            />
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title={t('page.chartExample.ringChart')}>
            <RingChart
              data={[
                { value: 42, name: t('page.chartExample.domesticMarket') },
                { value: 28, name: t('page.chartExample.asiaPacificMarket') },
                { value: 30, name: t('page.chartExample.europeanMarket') },
              ]}
              color={['#4C87F3', '#93F1B4', '#8BD8FC']}
              radius={['0%', '80%']}
            />
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title={t('page.chartExample.radarChart')}>
            <RadarChart
              indicator={[
                { name: t('page.chartExample.performance'), max: 100 },
                { name: t('page.chartExample.price'), max: 100 },
                { name: t('page.chartExample.quality'), max: 100 },
                { name: t('page.chartExample.service'), max: 100 },
                { name: t('page.chartExample.innovation'), max: 100 },
              ]}
              data={[
                {
                  name: t('page.chartExample.productA'),
                  value: [85, 65, 90, 82, 78],
                },
                {
                  name: t('page.chartExample.productB'),
                  value: [75, 85, 82, 90, 88],
                },
              ]}
              colors={['#8BD8FC', '#409EFF']}
            />
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title={t('page.chartExample.scatterChart')}>
            <ScatterChart
              data={[
                { value: [2.5, 7.8] },
                { value: [3.2, 5.4] },
                { value: [4.1, 8.5] },
                { value: [5.6, 9.2] },
                { value: [6.3, 7.7] },
                { value: [7.1, 10.8] },
                { value: [8.9, 8.7] },
                { value: [9.4, 11.9] },
                { value: [10.2, 9.8] },
                { value: [11.5, 12.6] },
                { value: [12.3, 10.7] },
                { value: [13.1, 14.8] },
              ]}
            />
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title={t('page.chartExample.kLineChart')}>
            <KLineChart
              data={[
                { time: '2024-03-01', open: 145, close: 152, high: 155, low: 143 },
                { time: '2024-03-02', open: 152, close: 148, high: 156, low: 147 },
                { time: '2024-03-03', open: 148, close: 158, high: 160, low: 146 },
              ]}
            />
          </Card>
        </Col>
      </Row>
    </BaseContainer>
  )
}
