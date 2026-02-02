import type Quill from 'quill'

import { useState } from 'react'

import type { ChangeEvent } from '@/components/quill'

import { BaseContainer } from '@/components/container'
import { QuillEditor } from '@/components/quill'

export default function QuillEditorExample() {
  const [text, setText] = useState('')

  // 定义事件处理函数
  function handleChange(value: string | null) {
    setText(value || '')
  }

  function handleTextChange(event: ChangeEvent) {
    console.log('change', event)
  }

  function handleBlur(quill: Quill) {
    console.log('blur', quill)
  }

  function handleFocus(quill: Quill) {
    console.log('focus', quill)
  }

  function handleReady(quill: Quill) {
    console.log('ready', quill)
  }

  return (
    <BaseContainer>
      <QuillEditor
        value={text}
        onChange={handleChange}
        onTextChange={handleTextChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onReady={handleReady}
      />
    </BaseContainer>
  )
}
