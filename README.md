<a name="fortune"></a>

## fortune(topic, options) ⇒ <code>Promise.&lt;string&gt;</code>
Returns a random fortune from [fortune-mod](https://launchpad.net/fortune-mod),
which is licensed under the [Simplified BSD Licence](https://opensource.org/licenses/BSD-2-Clause).
The original README can be found in the 'db' directory of this package

**Kind**: global function  
**Returns**: <code>Promise.&lt;string&gt;</code> - A promise to return the fortune. If no fortune
 matches the given options, the promise returns an empty string  

| Param | Type | Description |
| --- | --- | --- |
| topic | <code>string</code> | An optional topic for the fortune |
| options | <code>Object</code> | An options object with members 'topic'  (fortune topic) and 'dirty' (whether fortune should be dirty) |

