import '../css/app.css'
import Alpine from 'alpinejs'

window.Alpine = Alpine

Alpine.data('multiselect', (data, selectedData) => ({
  items: data,
  selected: selectedData,
  open: false,
  index: -1,
  incrementIndex() {
    this.index++
    if (this.index > this.items.length) {
      this.index = this.items.length
    }
  },
  decrementIndex() {
    this.index--
    if (this.index < -1) {
      this.index = -1
    }
  },
  toggle() {
    if (this.open) {
      return this.close()
    }

    this.open = true
  },
  handleSpace() {
    if (!this.open) {
      this.open = true
      return
    }

    if (this.index === -1) {
      this.close()
      return
    }

    this.toggleItemByIndex(this.index)
  },
  close(focusAfter) {
    this.open = false

    focusAfter && focusAfter.focus()
  },
  isSelected(item) {
    return this.selected.includes(item.id)
  },
  toggleItem(item) {
    if (this.isSelected(item)) {
      this.selected = this.selected.filter((i) => i !== item.id)
    } else {
      this.selected.push(item.id)
    }
  },
  toggleItemByIndex(index) {
    this.toggleItem(this.items[index])
  },
  classes(item, index) {
    const classes = ['hover:bg-blue-700']

    if (index === this.index) {
      classes.push('bg-blue-700')
    } else if (this.isSelected(item)) {
      classes.push('bg-blue-500')
    }
    return classes.join(' ')
  },
}))

Alpine.start()
