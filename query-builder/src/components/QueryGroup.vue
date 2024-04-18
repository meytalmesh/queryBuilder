<template>
  <div>
    <q-card>
      <q-card-section>
        <q-select
          v-model="logicalOperator"
          :options="logicalOperatorOptions"
          label="Logical Operator"
        />
        <q-select
          v-model="selectedField"
          :options="fieldOptions"
          label="Select Field"
        />
        <q-btn @click="addRule" label="Add Rule" />
        <q-btn v-if="depth < 3" @click="addGroup" label="Add Group" />
        <q-btn color="black" @click="saveGroup" label="Save Group" />
        <q-btn
          color="negative"
          @click="removeGroup"
          label="Remove Group"
          v-if="depth > 1"
        />
      </q-card-section>
    </q-card>
    <div v-for="(item, index) in items" :key="index">
      <div :style="{ marginLeft: depth * 20 + 'px' }">
        <q-card>
          <q-card-section>
            <div v-if="item.type === 'group'">
              <querry-group :item="item" :depth="depth + 1" />
            </div>
            <div v-else>
              <query-rule
                :key="index"
                @remove="removeItem(index)"
                @rule-saved="handleRuleSaved"
                :selected-field="selectedField"
              />
            </div>
            <query-group
              v-if="item.type === 'group'"
              @remove="removeItem(index)"
              :item="item"
              :depth="depth + 1"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import QueryRule from './QueryRule.vue';

export default {
  components: {
    QueryRule,
  },

  props: {
    depth: Number, // Depth level of the group
    item: Object, // Group data (if it's a nested group)
  },
  data() {
    return {
      selectedField: 'name',
      fieldOptions: ['name', 'password', 'username'], // Available field options
      logicalOperator: 'AND', // Default logical operator
      logicalOperatorOptions: ['AND', 'OR'], // Logical operator options
      items: [], // Array to hold rules and nested groups types
      rules: [], // hold rules per group
      groups: [], // all groups and rules
    };
  },
  methods: {
    // Define a method to handle the "rule-saved" event
    handleRuleSaved(ruleData) {
      this.rules.push({
        type: 'rule',
        field: this.selectedField,
        value: ruleData,
      });
    },

    addRule() {
      this.items.push({
        type: 'rule',
      });
    },
    addGroup() {
      if (this.getGroupCount() < 3) {
        this.items.push({
          type: 'group',
          //logicalOperator: this.logicalOperator,
        });
      }
      console.log('###', this.items);
    },

    saveGroup() {
      const GroupData = {
        operator: this.logicalOperator,
        rules: this.rules,
      };
      this.groups.push(GroupData);
      this.$emit('group-saved', this.groups);
      this.rules = [];

      console.log('$$$$ggg', this.groups);
    },

    removeItem(index) {
      this.items.splice(index, 1);
    },
    removeGroup() {
      this.$emit('remove');
    },
    getGroupCount() {
      // Recursive function to count the total number of nested groups
      const countGroups = (items) =>
        items.reduce((total, item) => {
          if (item.type === 'group') {
            total++;
            total += countGroups(item.rules);
          }
          return total;
        }, 0);
      return countGroups(this.items);
    },

    // async executeSelectQuery() {
    //   try {
    //     // Get the selected field, operator, and search value
    //     const field = this.selectedField;
    //     const value = this.searchValue;
    //     const operator = this.logicalOperator;

    //     // Make a GET request to the backend API
    //     const response = await axios.get('/api/select', {
    //       params: {
    //         field,
    //         condition: operator,
    //         value,
    //       },
    //     });

    //     // Set query results in the component's data
    //     this.queryResults = response.data;

    //     // Handle the results as needed
    //   } catch (error) {
    //     console.error(error);
    //     // Handle errors
    //   }
    // },
  },
};
</script>
