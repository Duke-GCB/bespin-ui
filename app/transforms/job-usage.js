import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize(serialized) {
    if (!serialized) {
      return null;
    }
    return {
      vmHours: serialized.vm_hours,
      cpuHours: serialized.cpu_hours,
    };
  },

  serialize(deserialized) {
    if (!deserialized) {
      return null;
    }
    return {
      vm_hours: deserialized.vmHours,
      cpu_hours: deserialized.cpuHours
    };
  }
});
