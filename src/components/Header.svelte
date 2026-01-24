<script>
  import Button from "../builders/desktop/button.svelte";
  import Attachment from "../builders/desktop/attachment.svelte";
  import Checkbox from "../builders/desktop/checkbox.svelte";
  import Combobox from "../builders/desktop/combobox.svelte";
  import DatePicker from "../builders/desktop/datepicker.svelte";
  import DateTimePicker from "../builders/desktop/datetimepicker.svelte";
  import Dialog from "../builders/desktop/dialog.svelte";
  import Dropdown from "../builders/desktop/dropdown.svelte";
  import FieldGroup from "../builders/desktop/fieldgroup.svelte";
  import MultiChoice from "../builders/desktop/multichoice.svelte";
  import Notification from "../builders/desktop/notification.svelte";
  import RadioButton from "../builders/desktop/radiobutton.svelte";
  import ReadOnlyTable from "../builders/desktop/readonlytable.svelte";
  import Spinner from "../builders/desktop/spinner.svelte";
  import Table from "../builders/desktop/table.svelte";
  import Tabs from "../builders/desktop/tabs.svelte";
  import Text from "../builders/desktop/text.svelte";
  import TextArea from "../builders/desktop/textarea.svelte";
  import TimePicker from "../builders/desktop/timepicker.svelte";
  import Tooltip from "../builders/desktop/tooltip.svelte";
  import UserOrgGroupSelect from "../builders/desktop/userorggroupselect.svelte";

  let dialog;
  let notification;
  let spinner;
</script>

<header>
  <h1>Kintone UI Component Tests</h1>

  <section>
    <h2>Button</h2>
    <Button
      text="Click Me"
      type="submit"
      onclick={() => alert("Button clicked!")}
    />
  </section>

  <section>
    <h2>Attachment</h2>
    <Attachment
      label="Upload Files"
      message="Max size: 50MB"
      onchange={(e) => console.log("Files changed:", e.detail)}
    />
  </section>

  <section>
    <h2>Checkbox</h2>
    <Checkbox
      label="Fruits"
      items={[
        { label: "Orange", value: "orange" },
        { label: "Apple", value: "apple" },
        { label: "Banana", value: "banana" },
      ]}
      value={["orange"]}
      onchange={(e) => console.log("Checkbox changed:", e.detail)}
    />
  </section>

  <section>
    <h2>Combobox</h2>
    <Combobox
      label="Select Fruit"
      items={[
        { label: "Orange", value: "orange" },
        { label: "Apple", value: "apple" },
      ]}
      value="orange"
      onchange={(e) => console.log("Combobox changed:", e.detail)}
    />
  </section>

  <section>
    <h2>DatePicker</h2>
    <DatePicker
      label="Select Date"
      value="2024-01-24"
      onchange={(e) => console.log("Date changed:", e.detail)}
    />
  </section>

  <section>
    <h2>DateTimePicker</h2>
    <DateTimePicker
      label="Select DateTime"
      value="2024-01-24T12:30:00"
      onchange={(e) => console.log("DateTime changed:", e.detail)}
    />
  </section>

  <section>
    <h2>Dialog</h2>
    <Button text="Open Dialog" onclick={() => dialog?.open()} />
    <Dialog
      bind:this={dialog}
      title="Dialog Title"
      content="This is dialog content"
      icon="info"
      onclose={() => console.log("Dialog closed")}
    />
  </section>

  <section>
    <h2>Dropdown</h2>
    <Dropdown
      label="Select Fruit"
      items={[
        { label: "Orange", value: "orange" },
        { label: "Apple", value: "apple" },
      ]}
      value="orange"
      onchange={(e) => console.log("Dropdown changed:", e.detail)}
    />
  </section>

  <section>
    <h2>FieldGroup</h2>
    <FieldGroup
      label="Collapsible Section"
      content="<p>This is the content inside the field group</p>"
      onchange={(e) => console.log("FieldGroup expanded:", e.detail.expanded)}
    />
  </section>

  <section>
    <h2>MultiChoice</h2>
    <MultiChoice
      label="Select Fruits"
      items={[
        { label: "Orange", value: "orange" },
        { label: "Apple", value: "apple" },
        { label: "Banana", value: "banana" },
      ]}
      value={["orange", "apple"]}
      onchange={(e) => console.log("MultiChoice changed:", e.detail)}
    />
  </section>

  <section>
    <h2>Notification</h2>
    <Button text="Show Notification" onclick={() => notification?.open()} />
    <Notification
      bind:this={notification}
      text="Success!"
      type="success"
      duration={3000}
      onclose={() => console.log("Notification closed")}
    />
  </section>

  <section>
    <h2>RadioButton</h2>
    <RadioButton
      label="Select Fruit"
      items={[
        { label: "Orange", value: "orange" },
        { label: "Apple", value: "apple" },
      ]}
      value="orange"
      onchange={(e) => console.log("RadioButton changed:", e.detail)}
    />
  </section>

  <section>
    <h2>ReadOnlyTable</h2>
    <ReadOnlyTable
      label="Data Table"
      columns={[
        { title: "Name", field: "name" },
        { title: "Age", field: "age" },
      ]}
      data={[
        { name: "John", age: "30" },
        { name: "Jane", age: "25" },
      ]}
    />
  </section>

  <section>
    <h2>Spinner</h2>
    <Button text="Show Spinner" onclick={() => spinner?.open()} />
    <Button text="Hide Spinner" onclick={() => spinner?.close()} />
    <Spinner bind:this={spinner} text="Loading..." />
  </section>

  <section>
    <h2>Table</h2>
    <Table
      label="Editable Table"
      columns={[
        {
          title: "Name",
          field: "name",
          render: (cellData, rowData, rowIndex) => {
            const input = document.createElement("input");
            input.value = cellData || "";
            input.addEventListener("change", (e) => {
              rowData.name = e.target.value;
            });
            return input;
          },
        },
        {
          title: "Age",
          field: "age",
          render: (cellData, rowData, rowIndex) => {
            const input = document.createElement("input");
            input.type = "number";
            input.value = cellData || "";
            input.addEventListener("change", (e) => {
              rowData.age = e.target.value;
            });
            return input;
          },
        },
      ]}
      data={[
        { name: "John", age: "30" },
        { name: "Jane", age: "25" },
      ]}
      onchange={(e) => console.log("Table changed:", e.detail)}
    />
  </section>

  <section>
    <h2>Tabs</h2>
    <Tabs
      items={[
        { label: "Tab A", value: "a", content: "<p>Content A</p>" },
        { label: "Tab B", value: "b", content: "<p>Content B</p>" },
        { label: "Tab C", value: "c", content: "<p>Content C</p>" },
      ]}
      value="a"
      onchange={(e) => console.log("Tab changed:", e.detail)}
    />
  </section>

  <section>
    <h2>Text</h2>
    <Text
      label="Enter Text"
      value="Hello"
      placeholder="Type something..."
      onchange={(e) => console.log("Text changed:", e.detail)}
    />
  </section>

  <section>
    <h2>TextArea</h2>
    <TextArea
      label="Enter Text"
      value="Hello World"
      placeholder="Type something..."
      onchange={(e) => console.log("TextArea changed:", e.detail)}
    />
  </section>

  <section>
    <h2>TimePicker</h2>
    <TimePicker
      label="Select Time"
      value="12:30"
      onchange={(e) => console.log("Time changed:", e.detail)}
    />
  </section>

  <section>
    <h2>Tooltip</h2>
    <Tooltip
      title="This is a tooltip"
      container={(() => {
        const btn = document.createElement("button");
        btn.innerText = "Hover me";
        return btn;
      })()}
    />
  </section>

  <section>
    <h2>UserOrgGroupSelect</h2>
    <UserOrgGroupSelect
      label="Select Users"
      items={[
        { label: "Alice", value: "alice", type: "user" },
        { label: "Bob", value: "bob", type: "user" },
        { label: "Marketing", value: "marketing", type: "group" },
      ]}
      value={["alice"]}
      onchange={(e) => console.log("Selection changed:", e.detail)}
    />
  </section>
</header>

<style>
  header {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  section {
    margin-bottom: 2rem;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  h2 {
    margin-top: 0;
    color: #333;
  }
</style>
