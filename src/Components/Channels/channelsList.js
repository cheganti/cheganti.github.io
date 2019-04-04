
import { ChannelsApiService } from '../ApiService/channelsApiService';
import { ChannelsDropdown } from './channelsDropdown';
export class ChannelsList {
    showChannels() {
        const channelsApiService = new ChannelsApiService();
        const channelsDropdown = new ChannelsDropdown();
        channelsApiService.getNewsChannelCategories().
        then(responseJson => {
            const channels = responseJson.sources;
            channelsDropdown.bindOptions(channels);
            // TODO: Channels List also need to show below the dropdown. For that need to use ChannelTemplate component.
        });
    }
}
