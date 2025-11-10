import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ActionButton } from './ActionButton';

describe('ActionButton', () => {
    it('should render button with children', () => {
        render(<ActionButton>Click me</ActionButton>);

        expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    it('should apply primary variant by default', () => {
        render(<ActionButton>Click me</ActionButton>);

        const button = screen.getByRole('button');
        expect(button).toHaveClass('primary');
    });

    it('should apply error variant when specified', () => {
        render(<ActionButton variant="error">Delete</ActionButton>);

        const button = screen.getByRole('button');
        expect(button).toHaveClass('error');
    });

    it('should show loading state', () => {
        render(<ActionButton isLoading>Submit</ActionButton>);

        expect(screen.getByText(/loading.../i)).toBeInTheDocument();
        expect(screen.queryByText(/submit/i)).not.toBeInTheDocument();
    });

    it('should be disabled when loading', () => {
        render(<ActionButton isLoading>Submit</ActionButton>);

        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
    });

    it('should call onClick when clicked', async () => {
        const handleClick = jest.fn();
        const user = userEvent.setup();

        render(<ActionButton onClick={handleClick}>Click me</ActionButton>);

        await user.click(screen.getByRole('button'));

        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
