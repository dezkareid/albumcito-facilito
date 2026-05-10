import { ConflictException, Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { AddStickerDto } from './dto/add-sticker.dto';
import { CollectionEntry } from './interfaces/collection-entry.interface';

@Injectable()
export class CollectionService {
  private readonly entries: CollectionEntry[] = [];

  constructor(private readonly authService: AuthService) {}

  addSticker(userId: string, dto: AddStickerDto): CollectionEntry {
    const { stickerId, albumId } = dto;
    const alreadyOwned = this.entries.find(
      (e) => e.userId === userId && e.stickerId === stickerId,
    );
    if (alreadyOwned) throw new ConflictException('Sticker already in collection');

    const isFirst = !this.entries.some((e) => e.userId === userId);
    const entry: CollectionEntry = { userId, stickerId, albumId, addedAt: new Date() };
    this.entries.push(entry);

    if (isFirst) {
      this.authService.completeOnboarding(userId, stickerId, albumId);
    }

    return entry;
  }

  getCollection(userId: string): CollectionEntry[] {
    return this.entries.filter((e) => e.userId === userId);
  }
}
