import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { App } from '../App';

describe('App', () => {
    it('renders without crashing', () => {
        render(<App />);
        // Basic assertion - assuming App has some content
        expect(document.body).toBeInTheDocument();
    });
});
