# For main.js

## requestAnimationFrame

If you base animations from a setInterval or setTimeout you are placing the stress on the main thread as your callbacks are placed into the task queue with other events. This way you are in great risk of creating jank as your animations events are staggered behind other events in this task queue.
window.requestAnimationFrame takes a callback as an argument to be invoked before the next repaint.

## Using window.requestAnimationFrame(cb)

```js
x = window.requestAnimationFrame(timestamp => cb(timstamp))
```

Each time requestAnimationFrame is called it returns a id, that seems to starts at 1 and is increases by 1 each time requestAnimationFrame is used, (however the docs mentions _'it uniquely identifies the entry...is a non-zero value, but you may not make any other assumptions about its value'_)
Above, x is equal to this id (1). requestAnimationFrame takes a callback that will be exectuted on the next animations frame, the callback is provied with one argument, the timestamp.
The number of callbacks is usually 60 times per second and will generally match the display refresh rate in the browser.

The timestamp is the number of ms, (with a decimal of 1000 µs) since the page was loaded.

### _How does it know when the page loaded?_

Most likely throught the performace API calling `performance.timeOrigin`, will provide the high resolution timestamp of the start time of the performance measurement.

