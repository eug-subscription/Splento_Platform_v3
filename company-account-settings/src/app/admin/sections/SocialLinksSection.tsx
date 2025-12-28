import { Card, TextField, Label, InputGroup } from "@heroui/react";
import { Icon } from '@iconify/react';
import type { SocialLinks } from '@/types';

interface SocialLinksSectionProps {
    socialLinks: SocialLinks;
    setSocialLinks: (links: SocialLinks) => void;
}

export function SocialLinksSection({ socialLinks, setSocialLinks }: SocialLinksSectionProps) {
    return (
        <Card variant="default" className="rounded-large hover:shadow-md transition-shadow">
            <Card.Header className="pb-0 pt-2 px-2">
                <Card.Title className="text-base font-semibold">
                    Social Links
                </Card.Title>
            </Card.Header>

            <Card.Content className="p-2">
                <div className="space-y-4">
                    <TextField name="website" type="url">
                        <Label>Website</Label>
                        <InputGroup>
                            <InputGroup.Prefix>
                                <Icon className="text-muted size-4" icon="mdi:web" />
                            </InputGroup.Prefix>
                            <InputGroup.Input
                                placeholder="https://www.example.com"
                                value={socialLinks.website}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSocialLinks({ ...socialLinks, website: e.target.value })}
                            />
                        </InputGroup>
                    </TextField>

                    <TextField name="linkedin" type="url">
                        <Label>LinkedIn</Label>
                        <InputGroup>
                            <InputGroup.Prefix>
                                <Icon className="text-muted size-4" icon="simple-icons:linkedin" />
                            </InputGroup.Prefix>
                            <InputGroup.Input
                                placeholder="LinkedIn Profile"
                                value={socialLinks.linkedin}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSocialLinks({ ...socialLinks, linkedin: e.target.value })}
                            />
                        </InputGroup>
                    </TextField>

                    <TextField name="instagram" type="url">
                        <Label>Instagram</Label>
                        <InputGroup>
                            <InputGroup.Prefix>
                                <Icon className="text-muted size-4" icon="simple-icons:instagram" />
                            </InputGroup.Prefix>
                            <InputGroup.Input
                                placeholder="Instagram Profile"
                                value={socialLinks.instagram}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSocialLinks({ ...socialLinks, instagram: e.target.value })}
                            />
                        </InputGroup>
                    </TextField>

                    <TextField name="twitter" type="url">
                        <Label>X (Twitter)</Label>
                        <InputGroup>
                            <InputGroup.Prefix>
                                <Icon className="text-muted size-4" icon="simple-icons:x" />
                            </InputGroup.Prefix>
                            <InputGroup.Input
                                placeholder="X Profile"
                                value={socialLinks.twitter}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSocialLinks({ ...socialLinks, twitter: e.target.value })}
                            />
                        </InputGroup>
                    </TextField>

                    <TextField name="facebook" type="url">
                        <Label>Facebook</Label>
                        <InputGroup>
                            <InputGroup.Prefix>
                                <Icon className="text-muted size-4" icon="simple-icons:facebook" />
                            </InputGroup.Prefix>
                            <InputGroup.Input
                                placeholder="Facebook Page"
                                value={socialLinks.facebook}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSocialLinks({ ...socialLinks, facebook: e.target.value })}
                            />
                        </InputGroup>
                    </TextField>
                </div>
            </Card.Content>
        </Card>
    );
}
