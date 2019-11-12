import { SIZES, MENU_POSITIONS } from './constants'

export default {
  value: {
    type: [Array, Object, String, Number, Boolean], // TODO set to null (any type) after issue fix
    default: () => null,
    note: 'value for "v-model".'
  },
  items: {
    type: [Array, String],
    required: false,
    note: 'array of suggestions (data fetched from backend, etc).'
  },
  itemText: {
    type: String,
    default: null, // 'text',
    // required: true,
    note: 'property in item for text.'
  },
  itemValue: {
    type: String,
    default: null, // значит вернуть весь объект, 'value'
    note: 'property in item for value.'
  },
  placeholder: {
    type: String,
    default: null,
    note: 'placeholder for input.'
  },
  loading: {
    type: Boolean,
    default: false,
    note: 'display the loading indicator.'
  },
  disabled: {
    type: Boolean,
    default: false,
    note: 'disable the select.'
  },
  readonly: {
    type: Boolean,
    default: false,
    note: 'readonly state.'
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
    note: 'filter function for search.'
  },
  searchText: {
    type: String,
    default: '',
    note: 'search string for input, you can use this with ".sync" modifier.'
  },
  inputElCustomAttributes: {
    type: Object,
    default: () => ({}),
    note: 'you can pass your attributes to the input element. Note: the attributes that are used by the component itself inside are not available, for example, "style".'
  },
  disableSearch: {
    type: Boolean,
    default: false,
    note: 'disable search input element.'
  },
  disableFilteringBySearch: {
    type: Boolean,
    default: false,
    note: 'disable filtering by search (you can use search for manually getting items).'
  },
  resetSearchOnBlur: {
    type: Boolean,
    default: true,
    note: 'reset search on blur event.'
  },
  allowMobileScroll: {
    type: Boolean,
    default: true,
    note: 'allow scrolling to an item on mobile devices.'
  },
  arrowsDisableInstantSelection: {
    type: Boolean,
    default: true,
    note: 'disable auto select when up or down with key arrow.'
  },
  menuItemsMaxHeight: {
    type: String,
    default: '300px',
    note: 'max menu height (any css value).'
  },
  eventEmitter: {
    type: Object,
    note: 'Observer pattern, helps manage events from parent to child.'
  },
  scrollItemsLimit: {
    type: Number,
    default: 20,
    note: 'the initial limit of the displayed items to scroll. So that there are not many elements in the scrolling at the beginning. Also see scrollItemsLimitAddAfterScroll prop.'
  },
  scrollItemsLimitAddAfterScroll: {
    type: Number,
    default: 10,
    note: 'the number of items added to the scrollItemsLimit prop after scrolling to the end of the scroll. Also see scrollItemsLimitAddAfterScroll prop.'
  },
  disableFirstItemSelectOnEnter: {
    type: Boolean,
    default: false,
    note: 'disable the selection of the first item from the list of items in menu when to press enter (when no item is selected).'
  },
  scrollToItemIfNeeded: {
    type: Boolean,
    default: true,
    note: 'to scroll to an item if it has moved beyond the scroll bar.'
  },
  inputStyles: {
    type: Object,
    default: () => ({}),
    note: 'custom styles for the input field. You can specify dynamic styles.'
  },
  inputForTextClass: {
    type: [Array, String, Object],
    default: () => '',
    note: 'custom "class" attribute for the input field. You can specify dynamic class.'
  },
  errorMessage: {
    type: String,
    default: null
  },
  successful: {
    type: Boolean,
    default: false,
    note: 'does the component have a successful state. If true, then apply green colors.'
  },
  size: {
    type: String,
    default: SIZES.DEFAULT,
    note: 'sets size'
  },
  menuDefaultPosition: {
    type: String,
    default: MENU_POSITIONS.BOTTOM,
    note: 'sets menu\'s default position'
  },
  menuDynamicPosition: {
    type: Boolean,
    default: true,
    note: 'sets the dynamic position behavior for the menu (based on viewport)'
  },
  selectTextOnFocus: {
    type: Boolean,
    default: false,
    note: 'if true, fully select a chosen item on focus so the user can instantly search for a new item.'
  },
  simpleInput: {
    type: Boolean,
    default: false,
    note: 'works as simple input (no menu)'
  }
}
