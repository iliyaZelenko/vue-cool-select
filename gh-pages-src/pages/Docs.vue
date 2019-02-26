<template>
  <section class="docs">
    <h1 id="docs-title">Documentation</h1>

    <prop-doc :component="CoolSelect">
      <template slot="pre-props">
        <h2>Slots</h2>
        <section class="props">
          <div class="proprow labels">
            <div class="propcol name required">name</div>
            <div class="propcol type">
              <a href="https://vuejs.org/v2/guide/components-slots.html#Scoped-Slots">
                slot-scope properties
              </a>
            </div>
            <div class="propcol notes">description</div>
          </div>
          <div
            v-for="slot of slots"
            :key="slot.name"
            class="proprow"
          >
            <div class="propcol name">{{ slot.name }}</div>
            <div class="propcol type">
              <ul>
                <li
                  v-for="(scopeAbout, scopeName) in slot.scopeProperties"
                  :key="scopeName"
                >
                  {{ scopeName }} — {{ scopeAbout }}
                </li>
              </ul>
              <!--<span v-if="!Object.keys(slot.scopeProperties).length">-</span>-->
            </div>
            <div class="propcol notes">{{ slot.description }}</div>
          </div>
        </section>
        <h2>Events</h2>
        <section class="props">
          <div class="proprow labels">
            <div class="propcol name required">name</div>
            <div class="propcol type">params</div>
            <div class="propcol notes">notes</div>
          </div>
          <div
            v-for="event in events"
            :key="event.name"
            class="proprow"
          >
            <div class="propcol name">{{ event.name }}</div>
            <div class="propcol type">{{ event.params }}</div>
            <div class="propcol notes">{{ event.notes }}</div>
          </div>
        </section>
        <h2>Props</h2>
      </template>
    </prop-doc>
  </section>
</template>

<script>
import propDoc from 'propdoc'
import { CoolSelect } from '~/main'

export default {
  name: 'Docs',
  components: { propDoc },
  data: () => ({
    CoolSelect,
    events: [
      {
        name: '@select',
        params: 'selectedItem (object)',
        notes: 'invoked when user selects an item'
      },
      {
        name: '@search',
        params: 'search string (string)',
        notes: 'invoked when user types in the input'
      },
      {
        name: '@focus',
        notes: 'when the field gets the focus'
      },
      {
        name: '@blur',
        notes: 'will when the field loses focus'
      },
      {
        name: '@keydown',
        params: 'event (Event object)',
        notes: 'input keydown'
      },
      {
        name: '@keyup',
        params: 'event (Event object)',
        notes: 'input keyup'
      },
      {
        name: '@scroll',
        params: 'scroll event (UIEvent, derives from Event)',
        notes: 'invoked when user scrolls in menu'
      }
    ],
    slots: [
      {
        name: 'selection',
        scopeProperties: {
          item: 'current selected item'
        },
        description: 'Define a custom selection appearance'
      },
      {
        name: 'no-data',
        scopeProperties: {},
        description: 'Define a custom no data appearance'
      },
      {
        name: 'item',
        scopeProperties: {
          item: 'item object'
        },
        description: 'Define a custom item appearance'
      },
      {
        name: 'before-items',
        scopeProperties: {},
        description: 'Content before items'
      },
      {
        name: 'after-items',
        scopeProperties: {},
        description: 'Content after items'
      },
      {
        name: 'error',
        scopeProperties: {
          errorMessage: 'error message string'
        },
        description: 'Define a custom error appearance'
      }
    ]
  })
}
</script>

<style lang="stylus">
  #docs-title
    font-size: 45px;
    text-align: center;

  .docs {
    padding: 50px;
    max-width: 100%;
    background-color: rgba(43, 59, 67, 0.05);
  }

  .props .proprow:nth-child(even) {
    background-color: rgba(43, 59, 67, 0.05);
  }
  .props .proprow {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 1.6rem 0.8rem;
  }
  .props .labels {
    padding: 0.8rem;
  }
  .props .labels > .propcol {
    font-size: 1rem;
    font-weight: 400;
    text-transform: uppercase;
    color: #547484;
  }
  .props .labels .name span {
    margin-left: 0.4rem;
  }
  .props .propcol {
    font-size: 1.2rem;
    flex: 1;
  }
  .props .propcol.notes {
    flex: 2;
  }
  .props .name {
    font-weight: 600;
  }
  .props .name.required span {
    border-bottom: 0.2rem solid rgba(206, 119, 128, 0.5);
  }

  .propcol * {
    display: inline;
  }

  .propdoc {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    margin-bottom: 12rem;
  }

  code {
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
    background-color: rgba(243, 195, 135, 0.5);
    color: #14435A;
    padding: 0.2rem;
  }

  pre code {
    line-height: 1.8;
    padding: 1.2rem;
  }
  pre code.labelled, .token pre code {
    position: relative;
    margin-bottom: 2rem;
  }
  pre code.labelled:after, .token pre code:after {
    content: attr(data-lang);
    font-size: 0.8rem;
    color: #CE7780;
    font-weight: 600;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    position: absolute;
    right: 1.2rem;
    top: 0;
  }

  .use, .props {
    margin: 2.8rem 0;
  }

  .token pre {
    margin: 0;
  }

  .use {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 2.8rem;
  }

  body {
    margin: 0;
  }

  ul {
    margin: 0;
    padding: 0;
  }
</style>
