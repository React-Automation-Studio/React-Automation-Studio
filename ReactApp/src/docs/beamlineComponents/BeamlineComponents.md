Recipe to create 3d perspective Beamline component:
<ol>
<li>In Inkscape create document with canvas size 50x50 px</li>
<li> Set the units to px</li>
<li> Create a mock beam line 10V, 50W, Centered at 0X 25Y</li>

<li>Draw the front face fo the component.</li>
<li>Rotate the face 15 degrees clockwise</li>
<li>Scale the face width to 30%</li>
<li>Copy the face</li>
<li>Offset it to the right by 20 pixels or so</li>
<li>Join the vertices by creating closed paths</li>
<li>Create a cut out on the front face for the beam pipe</li>
<li> Save the file</li>
<li> open it in a text editor and copy all the text</li>
<li> go to: https://react-svgr.com/playground/ and paste the text in svg input container</li>
<li> copy the jsx output</li>
<li> insert it in your own custom component or as child of the SvgComponent</li>
<li> remove unnecessary props and fills</li>
</ol>