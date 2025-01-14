'use client'

import { Button, Flex, Image, Stack } from '@mantine/core'
import { useState } from 'react'

export default function Home() {
  const [images, setImages] = useState<string[]>([])

  function getImage(id: string) {
    return `https://picsum.photos/seed/${id}/100`
  }

  function onAddImage() {
    const date = new Date()
    const image = getImage(date.toISOString())
    console.log('@@ image', image)
    setImages((prev) => [...prev, image])
  }

  function onRemoveRandom() {
    const randomIndex = Math.floor(Math.random() * images.length)
    const filtered = images.filter((_, index) => index !== randomIndex)
    setImages(filtered)
  }

  return (
    <div>
      <main>
        <Flex justify='center'>
          <Flex direction='column' align='center' p='sm' w={320}>
            <Stack gap='sm'>
              {images.map((item) => (
                <Image key={item} src={item} alt={item} />
              ))}
            </Stack>
            <Flex direction='column' align='center' gap='xs' mt='lg'>
              <Button onClick={onAddImage}>Add image</Button>
              <Button onClick={onRemoveRandom} color='red'>
                Remove random image
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </main>
    </div>
  )
}
