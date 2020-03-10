Every transit app accesses the same official api, found at https://511.org/open-data/transit. 

Most of them add graphical splash and fluff, not to mention location and other tracking.       
Both of these extraneous subroutines delay and obstruct our access to this public data.

Originally this project was to contain only a few hardcoded bus stops &ndash; but the robust and well-documented api inspired me to expand the project to any local agency and all of their stops.      
The bulk of this work appears in the [transitsearch](src/components/transitsearch.js) file.

The most complex piece is the Live Filter, capable of handling more than five thousand stop objects with relative efficiency. I am also proud of the ways I handle missing or incomplete data, intelligently and conditionally falling back to alternate values. 