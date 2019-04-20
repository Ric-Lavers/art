

/*
1. set up a reliable timing system that can be set to a bpm
  - performance.now, requestAnimationFrames etc.
2. pass a callback that is triggered on the beat.
  - return a promise
3. incorporate Symbols somewhere. 

*/

//console.clear()
const bpmToMs = (bpm, options={decimals: 2}) => {
  if (options.decimals > 14) { console.warn('max decimals is 14')}
  
  let beatsPerMs = 60 / bpm * 1000
  let decimalPlaces = 10**options.decimals

  return Math.round(beatsPerMs * decimalPlaces) / decimalPlaces
}
// 
let id=0;
let start=null;
let st = (timestamp, cb, options={dur: 3428.56}) => {
  if(!start) start = timestamp;
  let progress = timestamp - start;

  cb(progress);
  if(progress < options.dur){ id = window.requestAnimationFrame(t => st(t, cb)) }
}

//
const sixteenths = ["", "e", "&", "a"]
let phaseLen = 8
let currentValue = 0
let eanda = null
let onBpms = bpms => progress => {
  // console.log(Math.round(progress) % Math.round(bpms))

	let nextValue = Math.round( progress / bpms ) + 1
  if (nextValue <= phaseLen) { 
		if (currentValue !== Math.round( progress / bpms ) + 1){
  		currentValue = nextValue
		}
    let sixteenth = Math.round( progress / (bpms / 4) + 1) % 4
    if ( eanda !==  sixteenth || nextValue === 1 ) {
      console.log(nextValue + sixteenths[sixteenth] )
      eanda = sixteenth
      return nextValue + sixteenths[sixteenth]
    }
  }
}

let print = onBpms(bpmToMs(140))
window.requestAnimationFrame(t => st(t, print, {dur: bpmToMs(140) * phaseLen}))


var promiseStep = new Promise((resolve, reject) => {

  let step = (timestamp, cb, options={dur: 2000}) => {
    if(!start) start = timestamp;
    let progress = timestamp - start;
    if (window['beatMark'] === '4e') {
      console.log('4e!!')
      resolve('resolve 4e!')
    }
    if(window['beatMark'] !== '4e' || progress < options.dur){ id = window.requestAnimationFrame(t => st(t, cb)) }
  }

  window.requestAnimationFrame(t => step(t, cb)) 

})