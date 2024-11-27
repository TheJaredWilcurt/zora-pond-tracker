<template>
  <div>
    <header>
      <h1>
        Zora Pond<br>
        Item Tracker
      </h1>
      <h2>
        For Dungeons of Infinity
        <span class="select-wrapper">
          <select v-model="version" class="pixel-corners">
            <option version="1.2.0">1.2.0</option>
            <option version="1.1.6">1.1.6</option>
          </select>
        </span>
      </h2>
    </header>

    <h3>Your Inventory:</h3>
    <section>
      <InventoryItem
        v-for="(gemAmount, gemColor) in inventory.gems"
        v-model="inventory.gems[gemColor]"
        :alt="gemColor + ' colored gem'"
        :src="'/zora-pond-tracker/sprites/1.1.6/gem-' + gemColor + '.png'"
        :key="gemColor"
      ></InventoryItem>
      <InventoryItem v-model="inventory.bag"    alt="Bag"    :min="1" :max="3"></InventoryItem>
      <InventoryItem v-model="inventory.tunic"  alt="Tunic"  :min="1" :max="4"></InventoryItem>
      <InventoryItem v-model="inventory.sword"  alt="Sword"           :max="6"></InventoryItem>
      <InventoryItem v-model="inventory.shield" alt="Shield"          :max="4"></InventoryItem>
      <InventoryItem v-model="inventory.gloves" alt="Gloves"          :max="3"></InventoryItem>
      <InventoryItem v-model="inventory.bow"    alt="Bow"             :max="2"></InventoryItem>

      <div>
        <span
          v-for="(bool, item) in inventory.booleans"
          class="sub-item-wrapper"
          :key="'booleans-' + item"
        >
          <img
            :alt="titleCase(item)"
            class="sub-item pixel-corners pointer"
            :data-selected="bool"
            role="button"
            tabindex="0"
            :src="'/zora-pond-tracker/sprites/1.1.6/' + item + '.png'"
            @click="inventory.booleans[item] = !inventory.booleans[item]"
            @keydown.prevent.space="inventory.booleans[item] = !inventory.booleans[item]"
            @keyup.prevent.enter="inventory.booleans[item] = !inventory.booleans[item]"
          />
        </span>
      </div>
    </section>

    <h3>Possible Rewards</h3>
    <section>
      <div class="filters">
        <CheckBox v-model="inventory.filters.showAvailable">Show Available</CheckBox>
        <CheckBox v-model="inventory.filters.showUnavailable">Show Unavailable</CheckBox>
        <CheckBox v-model="inventory.filters.showRupees">Show Rupees</CheckBox>
        <span
          v-for="(bool, item) in inventory.filters.gems"
          class="sub-item-wrapper"
          :key="'sub-item-' + item"
        >
          <img
            :alt="titleCase(item + '-gem')"
            class="sub-item small pixel-corners pointer"
            :data-selected="bool"
            role="button"
            tabindex="0"
            :src="'/zora-pond-tracker/sprites/1.1.6/gem-' + item + '.png'"
            @click="inventory.filters.gems[item] = !inventory.filters.gems[item]"
            @keydown.prevent.space="inventory.filters.gems[item] = !inventory.filters.gems[item]"
            @keyup.prevent.enter="inventory.filters.gems[item] = !inventory.filters.gems[item]"
          />
        </span>
      </div>
      <ItemPrize :v="inventory" a="red"    b="red"    i="heart"                 />
      <ItemPrize :v="inventory" a="black"  b="black" :i="swordPrize"            />
      <ItemPrize :v="inventory" a="blue"   b="blue"  :i="inventoryPrize"        />
      <ItemPrize :v="inventory" a="black"  b="yellow" i="pendant-of-cures"      />
      <ItemPrize :v="inventory" a="black"  b="white"  i="pendant-of-revival"    />
      <ItemPrize :v="inventory" a="black"  b="purple" i="pendant-of-direction"  />
      <ItemPrize :v="inventory" a="black"  b="cyan"   i="pendant-of-protection" />
      <ItemPrize :v="inventory" a="red"    b="blue"   i="cape"                  />
      <ItemPrize :v="inventory" a="black"  b="green"  i="pendant-of-wealth"     />
      <ItemPrize :v="inventory" a="white"  b="blue"  :i="shieldPrize"           />
      <ItemPrize :v="inventory" a="white"  b="red"   :i="glovePrize"            />
      <ItemPrize :v="inventory" a="green"  b="blue"  :i="tunicPrize"            />
      <ItemPrize :v="inventory" a="purple" b="green"  i="potion-pink"           />
      <ItemPrize :v="inventory" a="cyan"   b="blue"   i="bomb-bag"              />
      <ItemPrize :v="inventory" a="green"  b="red"    i="gem-bag"               />
      <ItemPrize :v="inventory" a="purple" b="red"    i="rod-of-hearts"         />
      <ItemPrize :v="inventory" a="green"  b="green"  i="rod-of-rupees"         />
      <ItemPrize :v="inventory" a="green"  b="white"  i="ring-of-rupees"        />
      <ItemPrize :v="inventory" a="yellow" b="blue"   i="lamp"                  />
      <ItemPrize :v="inventory" a="pink"   b="blue"   i="potion-blue"           />
      <ItemPrize :v="inventory" a="white"  b="white" :i="bowPrize"              />
      <ItemPrize :v="inventory" a="cyan"   b="red"    i="quiver"                />
      <ItemPrize :v="inventory" a="purple" b="white"  i="ring-of-hearts"        />
      <ItemPrize :v="inventory" a="yellow" b="white"  i="ring-of-arrows"        />
      <ItemPrize :v="inventory" a="cyan"   b="white"  i="ring-of-bombs"         />
      <ItemPrize :v="inventory" a="cyan"   b="green"  i="rod-of-bombs"          />
      <ItemPrize :v="inventory" a="pink"   b="red"    i="potion-red"            />
      <ItemPrize :v="inventory" a="purple" b="purple" i="fairy-orb"             />
      <ItemPrize :v="inventory" a="pink"   b="white"  i="potion-white"          />
      <ItemPrize :v="inventory" a="cyan"   b="cyan"   i="ice-orb"     n="5"     />
      <ItemPrize :v="inventory" a="yellow" b="yellow" i="fire-orb"    n="4"     />
      <ItemPrize :v="inventory" a="black"  b="red"    i="pendant-of-health"     />
      <ItemPrize :v="inventory" a="black"  b="blue"   i="pendant-of-secrets"    />
      <ItemPrize :v="inventory" a="black"  b="pink"   i="pendant-of-magic"      />
      <ItemPrize :v="inventory" a="purple" b="blue"   i="rod-of-ice"            />
      <ItemPrize :v="inventory" a="yellow" b="green"  i="rod-of-stone"          />
      <ItemPrize :v="inventory" a="yellow" b="red"    i="rod-of-fire"           />
      <ItemPrize :v="inventory" a="purple" b="cyan"   i="bomb"        n="10"    />
      <ItemPrize :v="inventory" a="pink"   b="green"  i="potion-green"          />
      <ItemPrize :v="inventory" a="yellow" b="cyan"   i="magic"       n="2"     />
      <ItemPrize :v="inventory" a="pink"   b="cyan"   i="food-burger" n="2"     />
      <ItemPrize :v="inventory" a="pink"   b="yellow" i="can"         n="3"     />
      <ItemPrize :v="inventory" a="pink"   b="purple" i="food-muffin" n="2"     />
      <ItemPrize :v="inventory" a="pink"   b="pink"   i="can"         n="2"     />
      <ItemPrize :v="inventory" a="purple" b="yellow" i="arrows"      n="60"    />
    </section>

    <h3>Dwarven Maze</h3>
    <section>
      <a
        href="/zora-pond-tracker/dwarven-maze.jpg"
        target="_blank"
        style="display: inline-block;"
      >
        <img
          alt="Dwarven Maze Map"
          class="maze pixel-corners"
          src="/zora-pond-tracker/dwarven-maze.jpg"
        />
      </a>
    </section>
    <footer></footer>
  </div>
</template>

<script>
import CheckBox from '@/components/CheckBox.vue';
import InventoryItem from '@/components/InventoryItem.vue';
import ItemPrize from '@/components/ItemPrize.vue';
import NumberField from '@/components/NumberField.vue';

import { titleCase } from '@/helpers/index.js';

export default {
  components: {
    CheckBox,
    ItemPrize,
    InventoryItem,
    NumberField
  },
  data: function () {
    return {
      version: '1.1.6',
      inventory: {
        filters: {
          showAvailable: true,
          showUnavailable: false,
          showRupees: true,
          gems: {
            pink: true,
            purple: true,
            yellow: true,
            cyan: true,
            green: true,
            white: true,
            red: true,
            blue: true,
            black: true
          }
        },
        bag: 1,
        bow: 0,
        gloves: 0,
        shield: 0,
        sword: 1,
        tunic: 1,
        booleans: {
          'quiver': false,
          'bomb-bag': false,
          'gem-bag': false,
          'cape': false,
          'lamp': false,
          'pendant-of-cures': false,
          'pendant-of-direction': false,
          'pendant-of-health': false,
          'pendant-of-magic': false,
          'pendant-of-protection': false,
          'pendant-of-revival': false,
          'pendant-of-secrets': false,
          'pendant-of-wealth': false,
          'rod-of-bombs': false,
          'rod-of-fire': false,
          'rod-of-hearts': false,
          'rod-of-ice': false,
          'rod-of-rupees': false,
          'rod-of-stone': false,
          'ring-of-arrows': false,
          'ring-of-bombs': false,
          'ring-of-hearts': false,
          'ring-of-rupees': false
        },
        gems: {
          pink: 0,
          purple: 0,
          yellow: 0,
          cyan: 0,
          green: 0,
          white: 0,
          red: 0,
          blue: 0,
          black: 0
        }
      }
    };
  },
  methods: {
    titleCase
  },
  computed: {
    bowPrize: function () {
      const bowLevel = this.inventory.bow;
      if (this.version === '1.1.6') {
        if (bowLevel === 0) {
          return 'bow1';
        } else {
          return 'rupee';
        }
      }
      if (bowLevel === 2) {
        return 'rupee';
      }
      return 'bow' + (bowLevel + 1);
    },
    glovePrize: function () {
      const glovesLevel = this.inventory.gloves;
      if (glovesLevel === 3) {
        return 'rupee'
      }
      return 'gloves' + (glovesLevel + 1);
    },
    inventoryPrize: function () {
      const inventoryLevel = this.inventory.bag;
      if (inventoryLevel === 3) {
        return 'rupee';
      }
      return 'bag' + (inventoryLevel + 1);
    },
    shieldPrize: function () {
      const shieldLevel = this.inventory.shield;
      if (shieldLevel === 4) {
        return 'rupee';
      }
      return 'shield' + (shieldLevel + 1);
    },
    swordPrize: function () {
      const swordLevel = this.inventory.sword;
      if (swordLevel === 6) {
        return 'rupee';
      }
      return 'sword' + (swordLevel + 1)
    },
    tunicPrize: function () {
      const tunicLevel = this.inventory.tunic;
      if (tunicLevel === 4) {
        return 'rupee';
      }
      return 'tunic' + (tunicLevel + 1);
    }
  }
};
</script>
