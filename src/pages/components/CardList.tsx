import { Col, Row } from 'antd'
import { useTranslation } from 'react-i18next'

import { CountTo } from '@/components/count-to'
import { Icon } from '@/components/icon'

export default function CardList() {
  const { t } = useTranslation()

  return (
    <Row gutter={[20, 20]}>
      <Col xs={24} md={12} lg={6}>
        <div className="rd-8px from-[#56cdf3] to-[#719de3] bg-gradient-to-r px-[16px] pb-[4px] pt-[8px] text-white dark:from-[#1a4b6b] dark:to-[#2c4876]">
          <h3 className="text-[16px]">
            {t('page.home.hits')}
          </h3>
          <div className="flex items-center justify-between pt-[12px]">
            <Icon icon="icon-park-outline:trend" className="text-[30px]" />
            <CountTo
              startValue={1}
              endValue={124596}
              className="text-[30px]"
            />
          </div>
        </div>
      </Col>

      <Col xs={24} md={12} lg={6}>
        <div className="rd-8px from-[#ec4786] to-[#b955a4] bg-gradient-to-r px-[16px] pb-[4px] pt-[8px] text-white dark:from-[#7a2343] dark:to-[#5f2c54]">
          <h3 className="text-[16px]">
            {t('page.home.tradingVolume')}
          </h3>
          <div className="flex items-center justify-between pt-[12px]">
            <Icon icon="icon-park-outline:buy" className="text-[30px]" />
            <CountTo
              startValue={1}
              endValue={3785}
              className="text-[30px]"
            />
          </div>
        </div>
      </Col>

      <Col xs={24} md={12} lg={6}>
        <div className="rd-8px from-[#fcbc25] to-[#f68057] bg-gradient-to-r px-[16px] pb-[4px] pt-[8px] text-white dark:from-[#8c6914] dark:to-[#8d4930]">
          <h3 className="text-[16px]">
            {t('page.home.tradingValue')}
          </h3>
          <div className="flex items-center justify-between pt-[12px]">
            <Icon icon="icon-park-outline:finance" className="text-[30px]" />
            <CountTo
              startValue={1}
              endValue={1523948}
              prefix="$"
              className="text-[30px]"
            />
          </div>
        </div>
      </Col>

      <Col xs={24} md={12} lg={6}>
        <div className="rd-8px from-[#20c997] to-[#198754] bg-gradient-to-r px-[16px] pb-[4px] pt-[8px] text-white dark:from-[#125e47] dark:to-[#0e4a2f]">
          <h3 className="text-[16px]">
            {t('page.home.conversionRate')}
          </h3>
          <div className="flex items-center justify-between pt-[12px]">
            <Icon icon="icon-park-outline:analysis" className="text-[30px]" />
            <CountTo
              startValue={1}
              endValue={3.04}
              decimals={2}
              suffix="%"
              className="text-[30px]"
            />
          </div>
        </div>
      </Col>
    </Row>
  )
}
