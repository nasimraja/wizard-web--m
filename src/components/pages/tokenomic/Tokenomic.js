import React, { useState, useEffect } from 'react';
import $ from "jquery";
function Tokenomic() {
 

  useEffect(() => {
    // faq open js

		$(document).ready(function() {
			$('.block__title').click(function(event) {
				if($('.block').hasClass('one')){
					$('.block__title').not($(this)).removeClass('active');
					$('.block__text').not($(this).next()).slideUp(300);
				}
				$(this).toggleClass('active').next().slideToggle(300);
			});
		
		});

		// closed faq js
  });

  return (
    <div>
		<div>jsbcsiubcui</div>
     
    </div>
  );
}
export default Tokenomic;