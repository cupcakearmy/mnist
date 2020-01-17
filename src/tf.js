/* jslint esversion: 8, asi: true */

import * as tf from '@tensorflow/tfjs';

let model

tf.loadLayersModel('/model.json').then(m => {
    model = m
})

window.document.getElementById('test').addEventListener('click', async () => {
    const canvas = window.document.querySelector('canvas')

    const { data, width, height } = canvas.getContext('2d').getImageData(0, 0, 28, 28)

    const tensor = tf.tensor(new Uint8Array(data.filter((_, i) => i % 4 === 3)), [1, 28, 28, 1])
    const prediction = model.predict(tensor)
    const result = await prediction.data()
    const guessed = result.indexOf(1)
    console.log(guessed)
    window.document.querySelector('#result').innerText = guessed
})