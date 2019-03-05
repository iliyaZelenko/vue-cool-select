export default {
  value: {
    type: [Array, Object, String, Number, Boolean], // TODO set to null (any type) after issue fix
    // required: true,
    default: () => null,
    note: 'value for v-model'
  },
  items: {
    type: [Array, String],
    required: true,
    note: 'array of suggestions (data fetched from backend, etc)'
  },
  itemText: {
    type: String,
    default: null, // 'text',
    // required: true,
    note: 'property in item for text'
  },
  itemValue: {
    type: String,
    default: null, // значит вернуть весь объект, 'value'
    note: 'property in item for value'
  },
  placeholder: {
    type: String,
    default: null,
    note: 'placeholder for input'
  },
  loading: {
    type: Boolean,
    default: false,
    note: 'display the loading indicator'
  },
  loadingIndicator: { // http://loadinggif.com/images/image-selection/3.gif
    type: String,
    default: 'https://i.imgur.com/fLYd7PN.gif',
    note: 'sets custom loading spinner/indicator. https://loading.io/'
  },
  // invalid: {
  //   type: Boolean,
  // },
  errorMessage: {
    type: String,
    default: null
  },
  disabled: {
    type: Boolean,
    default: false,
    note: 'disable the select'
  },
  readonly: {
    type: Boolean,
    default: false,
    note: 'readonly state'
  },
  filter: {
    type: Function,
    default: (item, queryText, itemText) => {
      const hasValue = val => val != null ? val : ''

      const text = hasValue(itemText)
      const query = hasValue(queryText)

      return text.toString()
        .toLowerCase()
        .indexOf(query.toString().toLowerCase()) > -1
    },
    note: 'filter function for search'
  },
  searchText: {
    type: String,
    default: '',
    note: 'search string for input, you can use this with ".sync" modifier'
  },
  inputElCustomAttributes: {
    type: Object,
    default: () => ({}),
    note: 'you can pass your attributes to the input element'
  },
  disableSearch: {
    type: Boolean,
    default: false,
    note: 'disable search input element'
  },
  disableFilteringBySearch: {
    type: Boolean,
    default: false,
    note: 'disable filtering by search (you can use search for manually getting items)'
  },
  resetSearchOnBlur: {
    type: Boolean,
    default: true,
    note: 'reset search on blur event'
  },
  allowMobileScroll: {
    type: Boolean,
    default: true,
    note: 'allow scrolling to an item on mobile devices.'
  },
  arrowsDisableInstantSelection: {
    type: Boolean,
    default: false,
    note: 'disable auto select when up or down with key arrow'
  },
  menuItemsMaxHeight: {
    type: String,
    default: '300px',
    note: 'max menu height (any css value)'
  },
  eventEmitter: {
    type: Object,
    note: 'Observer pattern, helps manage events from parent to child'
  }
}
