import React from 'react';
import ReactDOM from 'react-dom';
import Comments from '../main/Comments.js';
import CommentInput from './CommentInput.js';
import * as d3 from 'd3';
import cloud from 'd3-cloud';
import { useState, useEffect } from 'react';

const container = document.getElementById('root');

const Visualize = ({ visible, toggle, userInfo }) => {
  const [writeComment, setWriteComment] = useState(false);

  const toggleWriteComment = () => {
    setWriteComment(!writeComment);
  }

  useEffect(() => {
    if (visible[1].type === 'bubble'){
      // List of words
      var myWords = [{ word: "Running", size: "10" }, { word: "Surfing", size: "20" }, { word: "Climbing", size: "50" }, { word: "Kiting", size: "30" }, { word: "Sailing", size: "20" }, { word: "Snowboarding", size: "60" }]


      // set the dimensions and margins of the graph
      var margin = { top: 1, right: 2, bottom: 1, left: 2 },
        width = 300 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

      // append the svg object to the body of the page
      var svg = d3.select(".visualize-pop-graph").append("svg")
        .attr("width", width + margin.left + margin.right +'')
        .attr("height", height + margin.top + margin.bottom +'')
        .append("g")
        .attr("transform",
          "translate(" + margin.left + " ," + margin.top + ")");

      // Constructs a new cloud layout instance. It run an algorithm to find the position of words that suits your requirements
      // Wordcloud features that are different from one word to the other must be here
      var layout = cloud()
        .size([width, height])
        .words(myWords.map(function (d) { return { text: d.word, size: d.size }; }))
        .padding(5)        //space between words
        .rotate(function () { return ~~(Math.random() * 2) * 90; })
        .fontSize(function (d) { return d.size; })      // font size of words
        .on("end", draw);
      layout.start();

      // This function takes the output of 'layout' above and draw the words
      // Wordcloud features that are THE SAME from one word to the other can be here
      function draw(words) {
        svg
          .append("g")
          .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
          .selectAll("text")
          .data(words)
          .enter().append("text")
          .style("font-size", function (d) { return d.size; })
          .style("fill", "#69b3a2")
          .attr("text-anchor", "middle")
          .style("font-family", "Impact")
          .attr("transform", function (d) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
          })
          .text(function (d) { return d.text; });
      }
    }
  })
  return (
    visible[0] ? ReactDOM.createPortal(
      <div className="visualize">
        <div className="visualize-pop">
            <div className="visualize-pop-graph"></div>
          {visible[1].type === 'post' ?
            <div className="post">
              <h2 className="post-title">{visible[1].data[0].title}</h2>
              <p className='post-username'>{visible[1].data[0].first_name + " " + visible[1].data[0].last_name}</p>
              <h4 className="post-author">{"@" + visible[1].data[0].username}</h4>
              <pre className="post-body">{visible[1].data[0].body}</pre>
            </div>
            : null}
          <button onClick={toggle}>close</button>
          <button onClick={toggleWriteComment}>add comment</button>
          {writeComment ? <CommentInput toggleWriteComment={toggleWriteComment} userInfo={userInfo} visible={visible} toggle={toggle} /> : null}
          <div className="comments">
            {visible[1].type === 'post' && !writeComment ? visible[1].data[1].map(comment => {
              return <Comments comment={comment} />;
            }) : null}
          </div>
        </div>
        <div className="visualize-overlay"></div>
      </div>
      , container) : null
  )
  // }
}

export default Visualize;