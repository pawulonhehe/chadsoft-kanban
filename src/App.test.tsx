import { render } from '@testing-library/react';
import { Modal } from 'Components';

test('renders learn react link', () => {
  render(<Modal onClose={jest.fn()}>srktt </Modal>);
});
