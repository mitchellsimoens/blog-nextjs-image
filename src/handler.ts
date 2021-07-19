interface Options {
  cf: {
    image: {
      fit?: string | null
      height?: string | null
      quality?: string | null
      width?: string | null
    }
  }
}

export async function handleRequest(request: Request): Promise<Response> {
  const url = new URL(request.url)
  const options: Options & RequestInit = {
    cf: {
      image: {},
    },
  }

  if (url.searchParams.has('fit')) {
    options.cf.image.fit = url.searchParams.get('fit')
  }

  if (url.searchParams.has('width')) {
    options.cf.image.width = url.searchParams.get('width')
  }

  if (url.searchParams.has('height')) {
    options.cf.image.height = url.searchParams.get('height')
  }

  if (url.searchParams.has('quality')) {
    options.cf.image.quality = url.searchParams.get('quality')
  }

  const imageURL = url.searchParams.get('image')
  const imageRequest = new Request(imageURL as string, {
    headers: request.headers,
  })

  return fetch(imageRequest, options)
}
