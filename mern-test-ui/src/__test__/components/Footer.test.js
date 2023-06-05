import React from 'react';
import { mount } from 'enzyme';
import { create } from 'react-test-renderer';
import Footer from '../../components/Footer';

describe('<Footer />', () => {
  const footer = mount(<Footer />);
  test('Render Footer', () => {
    expect(footer.length).toEqual(1);
  });
  test('render title', () => {
    expect(footer.find('.Footer-title').text()).toEqual('Ernesto Nunez Marrero');
  });
});

describe('<Footer /> snapshoot', () => {
  test('Check the UI of the Footer component.', () => {
    const footer = create(<Footer />);
    expect(footer.toJSON()).toMatchSnapshot();
  });
});
