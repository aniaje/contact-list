import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactCard from './ContactCard';
import { Contact } from '../../types';

const mockContact: Contact = {
    id: '1',
    firstNameLastName: 'John Doe',
    jobTitle: 'React Engineer',
    emailAddress: 'john.doe@example.com',
};

describe('ContactCard', () => {
    it('should render contact information', () => {
        render(<ContactCard data={mockContact} isSelected={false} onToggle={jest.fn()} />);

        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('React Engineer')).toBeInTheDocument();
        expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    });

    it('should display initials from first and last name', () => {
        render(<ContactCard data={mockContact} isSelected={false} onToggle={jest.fn()} />);

        expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('should display first two letters when name has one word', () => {
        const contact: Contact = {
            ...mockContact,
            firstNameLastName: 'Madonna',
        };

        render(<ContactCard data={contact} isSelected={false} onToggle={jest.fn()} />);

        expect(screen.getByText('MA')).toBeInTheDocument();
    });

    it('should display first and last initials for names with middle names', () => {
        const contact: Contact = {
            ...mockContact,
            firstNameLastName: 'John Middle Doe',
        };

        render(<ContactCard data={contact} isSelected={false} onToggle={jest.fn()} />);

        expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('should apply selected class when isSelected is true', () => {
        const { container } = render(
            <ContactCard data={mockContact} isSelected={true} onToggle={jest.fn()} />,
        );

        const card = container.firstChild as HTMLElement;
        expect(card).toHaveClass('selected');
    });

    it('should not apply selected class when isSelected is false', () => {
        const { container } = render(
            <ContactCard data={mockContact} isSelected={false} onToggle={jest.fn()} />,
        );

        const card = container.firstChild as HTMLElement;
        expect(card).not.toHaveClass('selected');
    });

    it('should call onToggle with contact id when clicked', async () => {
        const handleToggle = jest.fn();
        const user = userEvent.setup();

        render(<ContactCard data={mockContact} isSelected={false} onToggle={handleToggle} />);

        await user.click(screen.getByText('John Doe'));

        expect(handleToggle).toHaveBeenCalledTimes(1);
        expect(handleToggle).toHaveBeenCalledWith('1');
    });

    it('should call onToggle when clicking anywhere on the card', async () => {
        const handleToggle = jest.fn();
        const user = userEvent.setup();

        render(<ContactCard data={mockContact} isSelected={false} onToggle={handleToggle} />);

        await user.click(screen.getByText('john.doe@example.com'));

        expect(handleToggle).toHaveBeenCalledWith('1');
    });
});
