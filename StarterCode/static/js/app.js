// read in url data 
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

// set variables 
function getPlots(id){
    d3.json(url).then((data) =>{
        console.log(data);
        var ids=data.samples[0].otu_ids;
        console.log(ids);
        var sampleValues =  data.samples[0].sample_values.slice(0,10).reverse();
        console.log(sampleValues);
        var labels =  data.samples[0].otu_labels.slice(0,10);
        console.log (labels);
        var OTU_top = ( data.samples[0].otu_ids.slice(0, 10)).reverse();
        var OTU_id = OTU_top.map(d => "OTU " + d);
        console.log(`OTU IDS: ${OTU_id}`);
        var labels =  data.samples[0].otu_labels.slice(0,10);
        console.log(`OTU_labels: ${labels}`);
    
        // bar plot 
        var trace = {
            x: sampleValues,
            y: OTU_id,
            text: labels,
            marker: {
            color: 'blue'},
            type:"bar",
            orientation: "h",
        };
        // create data variable for bar chart
        var barData = [trace];
    
        // create layout variable for bar chart
        var barLayout = {
            title: "Top 10 OTU",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };
        // create the bar plot
        Plotly.newPlot("bar", barData, barLayout);
        });
    }
    // bubble chart 
    d3.json(url).then((data) =>{
        console.log(data);
        var bubbleIds=data.samples[0].otu_ids;
        console.log(bubbleIds);
        var bubbleSampleValues =  data.samples[0].sample_values;
        console.log(bubbleSampleValues);
        // bubble chart trace 
        var trace1 = {
            x: bubbleIds,
            y: bubbleSampleValues,
            mode: "markers",
            marker: {
                size: bubbleSampleValues,
                color: bubbleIds
            },
        };
        // set the layout for the bubble plot
        var layout_2 = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1000
        };

        // creating data variable for bubble plot
        var bubbleData = [trace1];

        // create the bubble plot
        Plotly.newPlot("bubble", bubbleData, layout_2); 
    });
    // demographic info panel
    function getDemoInfo(id) {
        // read in url data
            d3.json(url).then((data)=> {
        // metadata for demographic info
                var metadata = data.metadata;
        
                console.log(metadata)
        
              // filter metadata info by id
               var result = metadata.filter(meta => meta.id.toString() === id)[0];
              // select demographic panel id from html
               var demographicInfo = d3.select("#sample-metadata");
                
             // reset demographic info
               demographicInfo.html("");
        
             // append demographic info to panel
                Object.entries(result).forEach((key) => {   
                    demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
                });
            });
        }
    // create the function for the change event
    function optionChanged(id) {
        getPlots(id);
        getDemoInfo(id);
    }
        // create the function for the initial data rendering
        function init() {
            // select dropdown id menu from html
            var dropdown = d3.select("#selDataset");
        
            // read in url data 
            d3.json(url).then((data)=> {
        
                // append id data to dropdown menu
                data.names.forEach(function(name) {
                    dropdown.append("option").text(name).property("value");
                });
        
                // call the functions to display the data and the plots to the page
                getPlots(data.names[0]);
                getDemoInfo(data.names[0]);
            });
        }
        init();




  