import React from 'react';
import { mount, shallow } from 'enzyme';
import ProviderMock from '../../__mocks__/ProviderMock';
import Product from '../../components/Product';
import ProductMock from '../../__mocks__/ProductMock';

describe('<Product />', () => {
  test('renders without crashing', () => {
    const product = shallow(<ProviderMock><Product product={ProductMock} /></ProviderMock>);
    expect(product.length).toEqual(1);
  });

  test('Check add to cart btn', () => {
    const handleAddToCart = jest.fn();
    const wrapper = mount(<ProviderMock><Product product={ProductMock} handleAddToCart={handleAddToCart} /></ProviderMock>);
    wrapper.find('button').simulate('click');
    expect(handleAddToCart).toHaveBeenCalledTimes(1);
  });

});
