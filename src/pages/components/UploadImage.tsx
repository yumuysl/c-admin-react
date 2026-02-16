import { useState } from 'react'
import { Button, Upload } from 'antd'
import type { UploadFile } from 'antd'
import { createFileApi } from '@/apis/file'
import { useMutation } from '@tanstack/react-query'

export default function UploadImage() {
  const createMutation = useMutation({
    mutationFn: createFileApi,
    onSuccess: (res) => {
      console.log('success', res)
    },
    onError: (err) => {
      console.log('error', err)
    },
  })

  const fileList: UploadFile[] = []
  const maxUploadNumber: number = 3 //TODO:后续系统配置中替换

  const customRequest = async (options: any) => {
    console.log('options', options)
    const { file, onSuccess, onError, onProgress } = options
    const formData = new FormData()
    formData.append('fileName', file.name) // 'file' 字段名需与后端接口匹配
    formData.append('fileType', file.type)
    formData.append('size', file.size)
    formData.append('file', file)
    console.log(formData)
    // 可以追加其他参数
    //formData.append('userId', '123');
    await createMutation.mutateAsync(formData)
  }

  const handleChange = (info: object) => {
    console.log('info', info)
  }

  return (
    <>
      <div>
        <Upload
          accept="image/*, .pdf, .doc, .docx, .excel, .mp4, .mp3"
          customRequest={customRequest}
          listType="picture-card"
          defaultFileList={fileList}
          maxCount={maxUploadNumber}
          multiple={true}
          onChange={(info) => handleChange(info)}
        >
          {fileList.length >= maxUploadNumber ? null : <Button>上传</Button>}
        </Upload>
      </div>
    </>
  )
}
