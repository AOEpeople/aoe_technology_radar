---
title:      "Redux"
ring:       trial
quadrant:   languages-and-frameworks

---

[Redux](http://redux.js.org/) helps us to maintain state in our frontend applications in a more predictable and clearer way. It is extendable though middleware, it has a great documentation and some awesome [devtools](https://github.com/gaearon/redux-devtools) that are especially helpful when you are new to Redux.

The functional concepts for updating the state, combined with immutable data, lead to extremely easy and enjoyable [unit tests](http://redux.js.org/docs/recipes/WritingTests.html) - this is maybe the biggest plus for us developers.

The official [react-redux bindings](https://github.com/reactjs/react-redux) also made it straightforward to weave Redux into our React applications. For asynchronous actions we use [redux-sagas](https://redux-saga.github.io/redux-saga/) which has proven itself as a better alternative for [redux-thunk](https://github.com/gaearon/redux-thunk).

Currently, we use Redux only in our React projects, but we are evaluating it together with other frameworks such as Angular or Vue.js, as well.
