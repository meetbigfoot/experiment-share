const g = document.getElementById.bind(document)

g('share1').addEventListener('click', async () => {
  g('status1').textContent = 'attempting to fetch'
  const image = await fetch(g('test').src)
  g('status1').textContent = 'image recieved'
  const blob = await image.blob()
  g('status1').textContent = 'blob ready'
  const file = new File([blob], 'some.jpg', { type: blob.type })
  g('status1').textContent = 'file ready'
  // if (navigator.canShare && navigator.canShare({ files })) {
  try {
    await navigator.share({
      files: [file],
      text: 'My plan, map, and story for April 21.',
      title: 'Bigfoot made my day today!',
    })
    g('status1').textContent = 'Shared!'
  } catch (error) {
    g('status1').textContent = `Error: ${error.message}`
  }
  // } else {
  //   g('status').textContent = `Your system doesn’t support sharing these files.`
  // }
})

g('share2').addEventListener('click', async () => {
  g('status2').textContent = 'attempting to screenshot'
  html2canvas(g('test'), { allowTaint: true }).then(canvas => {
    g('status2').textContent = 'canvas ready'
    g('status2').appendChild(canvas)
    canvas.toBlob(async blob => {
      g('status2').textContent = 'blob ready'
      let file = new File([blob], 'some.jpg', { type: 'image/jpeg' })
      g('status2').textContent = 'file ready'
      try {
        await navigator.share({
          files: [file],
          text: 'My plan, map, and story for April 21.',
          title: 'Bigfoot made my day today!',
        })
        g('status2').textContent = 'Shared!'
      } catch (error) {
        g('status2').textContent = `Error: ${error.message}`
      }
    }, 'image/jpeg')
  })
})
