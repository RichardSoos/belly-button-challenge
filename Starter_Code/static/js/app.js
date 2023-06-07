d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(function(data) {
  let metadata = data.metadata;
  let rows = data.samples;
  let values = rows.map(ob => ob.sample_values);
  let idname = rows.map(ob => ob.otu_ids);


  // Populate dropdown menu
  const subjectIDs = rows.map(ob => ob.id);
  const dropdownMenu = document.getElementById('selDataset');

  subjectIDs.forEach((subjectID) => {
    const option = document.createElement('option');
    option.textContent = subjectID;
    option.value = subjectID;
    dropdownMenu.appendChild(option);
  });

  // Function to update the chart with the default data
  function setDefaultGraph() {
    // Set the default ID value
    const defaultID = "940";
  
    // Find the row that matches the default ID
    const defaultRow = rows.find(row => row.id === defaultID);
  
    // Populate the Demographic Info Panel
    var demographicInfoPanel = document.getElementById("sample-metadata");
    demographicInfoPanel.innerText = "ID: " + defaultID;
  
    // Find the metadata object with the matching ID
    const defaultMetadata = metadata.find(item => item.id === parseInt(defaultID));
  
    if (defaultMetadata) {
      // Update the demographicInfoPanel with the metadata attributes
      const ethnicity = defaultMetadata.ethnicity;
      const gender = defaultMetadata.gender;
      const age = defaultMetadata.age;
      const location = defaultMetadata.location;
      const bbtype = defaultMetadata.bbtype;
      const wfreq = defaultMetadata.wfreq;
  
      const demographicInfoPanel = document.getElementById("sample-metadata");
      demographicInfoPanel.innerHTML = "id: " + defaultID +
        "<br> ethnicity: " + ethnicity +
        "<br> gender: " + gender +
        "<br> age: " + age +
        "<br> location: " + location +
        "<br> bbtype: " + bbtype +
        "<br> wfreq: " + wfreq;
    }
  
    if (defaultRow) {
      // Extract the required data from the default row for the bar chart
      const defaultValues = defaultRow.sample_values.slice(0, 10);
      const defaultIDs = defaultRow.otu_ids.slice(0, 10).map(id => `OTU ${id}`);
  
      // Update the bar chart with the default data
      let trace2 = {
        x: defaultValues.reverse(),
        y: defaultIDs.reverse(),
        text: defaultRow.otu_labels.slice(0, 10),
        type: "bar",
        orientation: "h"
      };
  
      let tracedata2 = [trace2];
      Plotly.newPlot("bar", tracedata2);
  
      // Update the bubble chart with the default data
      const bubbleData = [{
        x: defaultRow.otu_ids,
        y: defaultRow.sample_values,
        text: defaultRow.otu_labels,
        mode: 'markers',
        marker: {
          color: defaultRow.otu_ids,
          size: defaultRow.sample_values
        }
      }];
  
      let bubbleLayout = {
        title: 'Bubble Chart',
        showlegend: false,
        height: 600,
        width: 1000
      };
  
      Plotly.newPlot('bubble', bubbleData, bubbleLayout);
    }
  }
  
  
  // Function to handle dropdown selection change
  function optionChanged(selectedID) {
    // Find the row that matches the selected ID
    const selectedRow = rows.find(row => row.id === selectedID);
    const defaultRow = rows.find(row => row.id === selectedID);
    const defaultMetadata = metadata.find(item => item.id === parseInt(selectedID));
    if (selectedRow) {
      // Extract the required data from the selected row
      const selectedValues = selectedRow.sample_values.slice(0, 10);
      const selectedIDs = selectedRow.otu_ids.slice(0, 10).map(id => `OTU ${id}`);
      const bselectedIDs = selectedRow.otu_ids.slice(0, 10).map(id => `${id}`).reverse(); 
      const selectedLabels = selectedRow.otu_labels.slice(0, 10);
      const selectedid = selectedRow.id;
      const ethnicity =  defaultMetadata.ethnicity;
      const gender = defaultMetadata.gender;
      const age = defaultMetadata.age;
      const location = defaultMetadata.location;
      const bbtype = defaultMetadata.bbtype;
      const wfreq = defaultMetadata.wfreq;
       
      
      // Update the demographicInfoPanel with the metadata attributes
      const demographicInfoPanel = document.getElementById("sample-metadata");
      demographicInfoPanel.innerHTML = "id: " + selectedid +
      "<br> ethnicity: " + ethnicity +
      "<br> gender: " + gender +
      "<br> age: " + age +
      "<br> location: " + location +
      "<br> bbtype: " + bbtype +
      "<br> wfreq: " + wfreq;


      // Update the bar chart with the selected data
      let trace3 = {
        x: selectedValues.reverse(),
        y: selectedIDs.reverse(),
        text: selectedLabels,
        type: "bar",
        orientation: "h"
      };

      let tracedata3 = [trace3];
      Plotly.newPlot("bar", tracedata3);

      // Update the bubble chart with the selected data
      const bubbleData2 = [{
        x: defaultRow.otu_ids,
        y: defaultRow.sample_values,
        text: selectedLabels,
        mode: 'markers',
        marker: {
          color: defaultRow.otu_ids,
          size: defaultRow.sample_values          
        }
      }];
      
      let bubbleLayout2 = {
        title: 'Bubble Chart',
        showlegend: false,
        height: 600,
        width: 1000
      };
      
      Plotly.newPlot('bubble', bubbleData2, bubbleLayout2);
    }
  }

  // Call the function to set the default graph when the page loads
  setDefaultGraph();

  // Add event listener to the dropdown menu
  dropdownMenu.addEventListener('change', function() {
    const selectedID = dropdownMenu.value;
    optionChanged(selectedID);
  });
});




