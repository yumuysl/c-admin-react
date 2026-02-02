import { Card, Descriptions } from 'antd'
import { useTranslation } from 'react-i18next'

import pkg from '../../../package.json'

interface PkgVersionInfo {
  name: string
  version: string
}

interface PkgJson {
  name: string
  version: string
  dependencies: PkgVersionInfo[]
  devDependencies: PkgVersionInfo[]
}

export default function About() {
  const { t } = useTranslation()

  const { name, version, dependencies, devDependencies } = pkg

  // 转换版本数据格式
  function transformVersionData(tuple: [string, string]): PkgVersionInfo {
    const [$name, $version] = tuple
    return {
      name: $name,
      version: $version,
    }
  }

  const pkgJson: PkgJson = {
    name,
    version,
    dependencies: Object.entries(dependencies).map(item => transformVersionData(item)),
    devDependencies: Object.entries(devDependencies).map(item => transformVersionData(item)),
  }

  return (
    <div className="m-2 flex flex-col gap-2">
      <Card title={t('page.about.title')} variant="borderless">
        {t('page.about.content')}
      </Card>

      <Card title={t('page.about.projectInfo')} variant="borderless">
        <Descriptions size="small" bordered>
          <Descriptions.Item label={t('page.about.version')}>
            {version}
          </Descriptions.Item>
          <Descriptions.Item label={t('page.about.projectAddress')}>
            <a href={`https://github.com/sunhaoxiang/${name}`} target="_blank" rel="noopener noreferrer">
              {name}
            </a>
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title={t('page.about.dependencies')} variant="borderless">
        <Descriptions size="small" bordered>
          {pkgJson.dependencies.map(item => (
            <Descriptions.Item key={item.name} label={item.name}>
              {item.version}
            </Descriptions.Item>
          ))}
        </Descriptions>
      </Card>

      <Card title={t('page.about.devDependencies')} variant="borderless">
        <Descriptions size="small" bordered>
          {pkgJson.devDependencies.map(item => (
            <Descriptions.Item key={item.name} label={item.name}>
              {item.version}
            </Descriptions.Item>
          ))}
        </Descriptions>
      </Card>
    </div>
  )
};
