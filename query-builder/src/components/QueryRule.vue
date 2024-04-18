<template>
  <div>
    <q-card>
      <q-card-section>
        <div class="title">{{ selectedField }}</div>
        <q-select
          v-model="selectedOperator"
          :options="operatorOptions"
          label="Operator"
        />
        <q-input v-model="value" label="Value" />
        <q-btn color="black" @click="saveRule" label="Save Rule" />
        <q-btn color="negative" @click="removeRule" label="Remove Rule" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  props: {
    selectedField: String, // Pass the selected field as a prop
  },

  data() {
    return {
      operatorOptions: ['=', '!='], // Operator options
      selectedOperator: '=', // Default selected operator
      value: '', // Value input
    };
  },

  methods: {
    removeRule() {
      this.$emit('remove');
    },

    saveRule() {
      // Define the rule data
      const ruleData = {
        field: this.selectedField, // Assuming selectedField is available in the component
        operator: this.selectedOperator,
        value: this.value,
      };

      // Emit a custom event to send the rule data to the parent component
      this.$emit('rule-saved', ruleData);
    },
  },
};
</script>
