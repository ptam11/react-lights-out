import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import Board from '../Board';

configure({ adapter: new Adapter() });

it('App renders without crashing', function() {
	shallow(<App />);
});

it('Board Component renders without errors', function() {
	const div = document.createElement('div');
	ReactDOM.render(<Board />, div);
	ReactDOM.unmountComponentAtNode(div);
});

it('matches snapshot', function() {
  let wrapper = shallow(<Board />);
  
	let serialized = toJson(wrapper);
	expect(serialized).toMatchSnapshot();
});

it('it should render starter board', function() {
	let wrapper = mount(<Board />);
	expect(wrapper.html()).toContain('<td class="Cell"></td>');
});

// it('it should ensure clicking will flip the right cells', function() {
//   let wrapper = mount(<Board />);
//   wrapper.setProps({ ncols= })
// 	wrapper.find("button[value='z']").simulate('click', { target: { value: 'z' } });

// 	expect(wrapper.html()).toContain(img1);
// });

// TODO https://airbnb.io/enzyme/docs/api/ReactWrapper/at.html 
// after finding similar elements do `at(index)`

it('it should return winning message', function() {
  let wrapper = mount(<Board />);
  wrapper.setProps({ ncols: 2, nrows: 2 }) 
  wrapper.setState({ 
    hasWon: true, 
    boxes: [
      [{isLit: false}, {isLit: false}],
      [{isLit: false}, {isLit: false}]
    ]
  })
  console.log(wrapper.debug())
	expect(wrapper.html()).toContain("You have won");
});
